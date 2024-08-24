import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleRequestDto {
  @ApiProperty({ description: 'Name of the role', example: 'Admin' })
  readonly name: string;

  @ApiProperty({
    description: 'List of permission name associated with the role',
    example: ['Manage users', 'Manage roles'],
  })
  readonly permissions: string[];

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator role with full permissions',
  })
  readonly description: string;

  constructor(name: string, permissions: string[], description: string) {
    this.name = name;
    this.permissions = permissions;
    this.description = description;
  }
}
