import * as crypto from 'crypto';

export class Password {
  private readonly hashedPassword: string;
  private readonly salt: string;

  constructor(rawPassword: string, salt?: string) {
    if (!this.validate(rawPassword)) {
      throw new Error('Invalid password');
    }
    this.salt = salt || this.generateSalt();
    this.hashedPassword = this.hashPassword(rawPassword, this.salt);
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  public getSalt(): string {
    return this.salt;
  }

  validate(rawPassword: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(rawPassword);
  }

  verify(rawPassword: string): boolean {
    const hashed = crypto
      .pbkdf2Sync(rawPassword, this.salt, 1000, 64, 'sha512')
      .toString('hex');
    return hashed === this.hashedPassword;
  }

  private generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }
}
