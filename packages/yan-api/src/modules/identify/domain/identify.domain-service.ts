import { JwtService } from './jwt.service';
import * as crypto from 'crypto';
import { UserEntity } from '../infrastructure/database/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';

/**
 * @description This is a domain service class for Identify domain
 */
@Injectable()
export class IdentifyDomainService {
  private readonly logger = new Logger(IdentifyDomainService.name);

  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: UserEntity): string {
    this.logger.log('Generating access token for user: ', user.id);

    const payload = {
      sub: user.id,
      roles: user.userRoles.map((role) => role.role.name),
    };
    const token = this.jwtService.sign(payload);

    this.logger.log('Access token generated successfully for user: ', user.id);
    return token;
  }

  generateRefreshToken(): string {
    this.logger.log('Generating refresh token');

    const refreshToken = crypto.randomBytes(64).toString('hex');

    this.logger.log('Refresh token generated successfully');
    return refreshToken;
  }

  verifyPassword(
    rawPassword: string,
    salt: string,
    hashedPassword: string,
  ): boolean {
    this.logger.debug('Verifying password');

    const hashed = crypto
      .pbkdf2Sync(rawPassword, salt, 1000, 64, 'sha512')
      .toString('hex');
    const isPasswordValid = hashed === hashedPassword;

    this.logger.log('Password verification result: ', isPasswordValid);
    return isPasswordValid;
  }
}
