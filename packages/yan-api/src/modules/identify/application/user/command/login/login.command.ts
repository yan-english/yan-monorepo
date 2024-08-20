export class LoginCommand {
  readonly email: string;
  readonly password: string;

  constructor(props: { email: string; password: string }) {
    this.email = props.email;
    this.password = props.password;
  }
}
