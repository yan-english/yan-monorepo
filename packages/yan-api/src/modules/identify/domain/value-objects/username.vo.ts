export class Username {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid username');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
  private validate(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    return usernameRegex.test(username);
  }
}
