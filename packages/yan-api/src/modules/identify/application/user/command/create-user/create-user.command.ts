import { CreateUserRequestDto } from './create-user.request.dto';

export class CreateUserCommand {
  readonly email: string;
  readonly password: string;
  readonly roles: string[];

  constructor(props: CreateUserRequestDto) {
    this.email = props.email;
    this.password = props.password;
    this.roles = props.roles;
  }
}
