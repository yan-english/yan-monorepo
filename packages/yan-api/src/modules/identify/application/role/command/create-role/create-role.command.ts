import { CreateRoleRequestDto } from './create-role.request.dto';

export class CreateRoleCommand {
  readonly name: string;
  readonly permissions: string[];
  readonly description: string;

  constructor(props: CreateRoleRequestDto) {
    this.name = props.name;
    this.permissions = props.permissions;
    this.description = props.description;
  }
}
