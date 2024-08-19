import { CreateUserRequestDto } from './create-user.request.dto';

export class CreateUserCommand {
  readonly email: string;
  readonly password: string;

  constructor(props: CreateUserRequestDto) {
    this.email = props.email;
    this.password = props.password;
  }
}
