import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IdentifyDomainService } from '../../../../domain/identify.domain-service';
import { UserRepositoryPort } from '../../user.repository.port';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { RefreshTokenCommand } from './refresh-token.command';
import { REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_PREFIX } from '../../../../../../commons/application/constants';
import { LoginResponse } from '../../user.types';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
  private readonly logger = new Logger(RefreshTokenHandler.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(USER_REPOSITORY) private userRepository: UserRepositoryPort,
    private readonly identifyService: IdentifyDomainService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<LoginResponse> {

    // Lấy refresh token từ body mà client gửi lên
    const { refreshToken } = command;

    // Kiểm tra refresh token có hợp lệ không bằng cách so sánh với token đượuc lưu trong cache
    // nêu token không hợp lệ thì trả về lỗi 401 Unauthorized
    // nếu hợp lệ thì lấy userId từ cache
    const userId = await this.verifyRefreshToken(refreshToken);

    if (!userId) {
      this.logger.warn('Invalid refresh token');
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Lấy thông tin user từ db để tạo access token mới
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      this.logger.warn('User not found');
      throw new UnauthorizedException('User not found');
    }

    // Tạo access token mới và refresh token mới
    const newAccessToken = this.identifyService.generateAccessToken(user);
    const newRefreshToken = this.identifyService.generateRefreshToken();

    // Lưu refresh token mới vào cache với userId tương ứng
    await this.cacheManager.set(`${REFRESH_TOKEN_PREFIX}${newRefreshToken}`, userId, REFRESH_TOKEN_EXPIRATION);

    // Xóa refresh token cũ khỏi cache
    await this.cacheManager.del(`${REFRESH_TOKEN_PREFIX}${refreshToken}`);

    this.logger.log('Refresh token successfully refreshed');
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async verifyRefreshToken(token: string): Promise<string> {
    const userId = await this.cacheManager.get<string>(`${REFRESH_TOKEN_PREFIX}${token}`);
    if (!userId) {
      this.logger.warn('Invalid refresh token');
      throw new UnauthorizedException('Invalid refresh token');
    }
    return userId;
  }
}