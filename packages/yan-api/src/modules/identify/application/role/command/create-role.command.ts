import { CreateRoleRequest } from './create-role.request';

export class CreateRoleCommand {
  readonly name: string;
  readonly permissionIds: string[];
  readonly description: string;

  constructor(props: CreateRoleRequest) {
    this.name = props.name;
    this.permissionIds = props.permissionIds;
    this.description = props.description;
  }
}
