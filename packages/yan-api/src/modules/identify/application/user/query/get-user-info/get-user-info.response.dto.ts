import { PermissionEntity } from '../../../../infrastructure/database/entities/permission.entity';

export class GetUserInfoResponseDto {
  id: string;

  username: string;

  email: string;

  dateOfBirth: Date;

  gender: string;

  listRoles: string[];

  listPermissions: PermissionEntity[][];
  constructor(
    id: string,
    username: string,
    email: string,
    dateOfBirth: Date,
    listRoles: string[],
    listPermissions: PermissionEntity[][],
  ) {
    this.listPermissions = listPermissions;
    this.listRoles = listRoles;
    this.id = id;
    this.username = username;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
  }
}
