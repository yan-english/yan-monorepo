import { Role } from '../domain/entities/role';
import { RoleEntity } from '../infrastructure/database/entities/role.entity';
import { Mapper } from '../../../commons/ddd/mapper.interface';
import { Id } from '../domain/value-objects/id.vo';
import { RoleName } from '../domain/value-objects/role-name.vo';
import { RoleDescription } from '../domain/value-objects/role-description.vo';

export class RoleMapper implements Mapper<Role, RoleEntity> {
  toDomain(record: RoleEntity): Role {
    const listPermissionIds = record.rolePermissions.map(
      (permission) => permission.id,
    );
    return new Role(
      new Id(record.id),
      new RoleName(record.name),
      new RoleDescription(record.description),
      listPermissionIds,
    );
  }

  toPersistence(entity: Role): RoleEntity {
    return new RoleEntity({
      id: entity.getId().getValue(),
      name: entity.getName().getValue(),
      description: entity.getDescription().getValue(),
      userRoles: [],
      rolePermissions: [],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toResponse(entity: Role) {
    return undefined;
  }
}
