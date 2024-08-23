import { LoginRequestDto } from './login.request.dto';

export class LoginCommand {
  readonly email: string;
  readonly password: string;

  constructor(props: LoginRequestDto) {
    this.email = props.email;
    this.password = props.password;
  }
}
