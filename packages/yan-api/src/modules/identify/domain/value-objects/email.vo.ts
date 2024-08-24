import { BadRequestException } from '@nestjs/common';

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new BadRequestException('Invalid email');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
  private validate(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
