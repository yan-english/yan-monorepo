export class Token {
  constructor(
    private readonly value: string,
    private readonly expiryDate: Date,
  ) {}

  isValid(): boolean {
    return new Date() < this.expiryDate;
  }

  toString(): string {
    return this.value;
  }
}
