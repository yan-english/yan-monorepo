import { AggregateRoot } from '../../../../commons/ddd/aggregate-root.base';
import { Id } from '../value-objects/id.vo';
import { RoleName } from '../value-objects/role-name.vo';
import { RoleDescription } from '../value-objects/role-description.vo';
import { randomUUID } from 'crypto';

export class Role extends AggregateRoot<Id> {
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
    // Need to use snowflake instead of UUID here
    const id = new Id(randomUUID());
    const roleName = new RoleName(name);
    const roleDescription = new RoleDescription(description);

    return new Role(id, roleName, roleDescription, permissions);
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
