export class Password {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      // Need to update this logic. Throw a custom error
      throw new Error('Invalid password');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
  private validate(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  }
}
