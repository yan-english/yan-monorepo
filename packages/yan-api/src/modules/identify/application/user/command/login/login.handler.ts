import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserRepositoryPort } from '../../user.repository.port';
import { IdentifyDomainService } from '../../../../domain/identify.domain-service';
import { LoginResponse } from '../../user.types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_PREFIX } from '../../../../../../commons/application/constants';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  private readonly logger = new Logger(LoginHandler.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly identifyService: IdentifyDomainService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponse> {
    this.logger.log(`Executing login command for email: ${command.email}`);

    // lấy thông tin user từ db
    const user = await this.userRepository.findByEmail(command.email);
    this.logger.log('User fetched successfully with information: ', user);

    // kiểm tra user có tồn tại không, nếu không tồn tại thì trả về lỗi
    if (!user) {
      this.logger.warn('The user does not exist');
      throw new BadRequestException('The user does not exist');
    }

    // kiểm tra password có đúng không
    const isCorrectPassword = this.identifyService.verifyPassword(
      command.password,
      user.salt,
      user.password,
    );
    this.logger.log('Password verification result: ', isCorrectPassword);
    if (!isCorrectPassword) {
      this.logger.warn('Password is incorrect');
      throw new BadRequestException('Password is incorrect');
    }

    // nếu user tồn tại và password đúng thì tạo access token và refresh token
    const accessToken = this.identifyService.generateAccessToken(user);
    this.logger.log('Access token generated: ', accessToken);

    const refreshToken = this.identifyService.generateRefreshToken();
    this.logger.log('Refresh token generated: ', refreshToken);

    // lưu refresh token vào cache với time to live
    // time to live chính là expiration time của refresh token
    await this.cacheManager.set(
      `${REFRESH_TOKEN_PREFIX}${refreshToken}`,
      user.id,
      REFRESH_TOKEN_EXPIRATION,
    );
    this.logger.log(
      'Refresh token set in cache with expiration time: ',
      REFRESH_TOKEN_EXPIRATION,
    );

    this.logger.log('Login command executed successfully returning tokens: ', {
      accessToken,
      refreshToken,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
