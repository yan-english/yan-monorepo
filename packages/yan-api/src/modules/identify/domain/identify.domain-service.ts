import { User } from './entities/user';
import { JwtService } from './jwt.service';
import * as crypto from 'crypto';

/**
 * @description This is a domain service class for Identify domain
 */
export class IdentifyDomainService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: User): string {
    const payload = {
      sub: user.getId(),
      // roles: user.getRoles()
    };
    const value = this.jwtService.sign(payload);
    // const expiryDate = new Date(Date.now() + 3600 * 1000); // 1 hour

    return value;
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}
