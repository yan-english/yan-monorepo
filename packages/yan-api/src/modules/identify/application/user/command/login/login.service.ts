import { CommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserRepositoryPort } from '../../user.repository.port';
import { IdentifyDomainService } from '../../../../domain/identify.domain-service';

@CommandHandler(LoginCommand)
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly identifyService: IdentifyDomainService,
  ) {}

  async execute(command: LoginCommand) {
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

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
