import { RoleEntity } from '../entities/role.entity';
import { DataSource } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { randomUUID } from 'crypto';
import { Seeder } from 'typeorm-extension';
import { RolePermissionEntity } from '../entities/role-permission.entity';

export default class CreateRoles implements Seeder {
  public async run(ds: DataSource): Promise<RoleEntity> {
    console.log('🌱 Seeding roles...');
    const roleRepository = ds.getRepository(RoleEntity);
    const permissionRepository = ds.getRepository(PermissionEntity);
    const listPermissions = await permissionRepository.find();
    const role = new RoleEntity({
      id: randomUUID(),
      name: 'Admin',
      description: 'Admin role',
      userRoles: [],
      rolePermissions: [],
    });
    role.rolePermissions = listPermissions.map((permission) => {
      const rolePermission = new RolePermissionEntity();
      rolePermission.role = role;
      rolePermission.permission = permission;
      return rolePermission;
    });
    await roleRepository.save(role);
    return role;
  }
}
