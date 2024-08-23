import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleRequest {
  @ApiProperty({ description: 'Name of the role', example: 'Admin' })
  readonly name: string;

  @ApiProperty({
    description: 'List of permission IDs associated with the role',
    example: ['1', '2', '3'],
  })
  readonly permissionIds: string[];

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator role with full permissions',
  })
  readonly description: string;

  constructor(name: string, permissionIds: string[], description: string) {
    this.name = name;
    this.permissionIds = permissionIds;
    this.description = description;
  }
}
