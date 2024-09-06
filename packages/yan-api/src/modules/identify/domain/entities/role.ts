import { AggregateRoot } from '../../../../commons/ddd/aggregate-root.base';
import { Id } from '../value-objects/id.vo';
import { RoleName } from '../value-objects/role-name.vo';
import { RoleDescription } from '../value-objects/role-description.vo';
import { randomUUID } from 'crypto';
import { Logger } from '@nestjs/common';

export class Role extends AggregateRoot<Id> {
  private readonly logger = new Logger(Role.name);
  private readonly name: RoleName;
  private readonly description: RoleDescription;
  private readonly permissions: string[];

  constructor(
    id: Id,
    name: RoleName,
    description: RoleDescription,
    permissions: string[],
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.permissions = permissions;
  }

  static create(
    name: string,
    description: string,
    permissions: string[],
  ): Role {
    const logger = new Logger(Role.name);
    logger.log('Creating a new Role with data: ', {
      name,
      description,
      permissions,
    });

    // Need to use snowflake instead of UUID here
    const id = new Id(randomUUID());
    const roleName = new RoleName(name);
    const roleDescription = new RoleDescription(description);

    const role = new Role(id, roleName, roleDescription, permissions);
    logger.log('Role created successfully with ID: ', id);

    return role;
  }

  public getPermissions(): string[] {
    return this.permissions;
  }

  public getName(): RoleName {
    return this.name;
  }

  public getDescription(): RoleDescription {
    return this.description;
  }
}
