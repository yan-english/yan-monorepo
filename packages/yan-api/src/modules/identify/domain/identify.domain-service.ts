import { JwtService } from './jwt.service';
import * as crypto from 'crypto';
import { UserEntity } from '../infrastructure/database/entities/user.entity';
import { Injectable } from '@nestjs/common';

/**
 * @description This is a domain service class for Identify domain
 */
@Injectable()
export class IdentifyDomainService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      roles: user.userRoles.map((role) => role.role.name),
    };
    // const expiryDate = new Date(Date.now() + 3600 * 1000); // 1 hour

    return this.jwtService.sign(payload);
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  verifyPassword(rawPassword: string, salt: string, hashedPassword): boolean {
    const hashed = crypto
      .pbkdf2Sync(rawPassword, salt, 1000, 64, 'sha512')
      .toString('hex');
    return hashed === hashedPassword;
  }
}
