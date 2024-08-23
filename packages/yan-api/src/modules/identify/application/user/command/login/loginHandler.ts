import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserRepositoryPort } from '../../user.repository.port';
import { IdentifyDomainService } from '../../../../domain/identify.domain-service';
import { LoginResponse } from '../../user.types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { REFRESH_TOKEN_PREFIX } from '../../../../../../commons/application/constants';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly identifyService: IdentifyDomainService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new Error('User does not exist');
    }

    const isCorrectPassword = this.identifyService.verifyPassword(
      command.password,
      user.salt,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new Error('Password is incorrect');
    }

    const accessToken = this.identifyService.generateAccessToken(user);
    const refreshToken = this.identifyService.generateRefreshToken();
    await this.cacheManager.set(
      `${REFRESH_TOKEN_PREFIX}${user.id}`,
      refreshToken,
      60 * 60 * 24 * 30,
    );

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
