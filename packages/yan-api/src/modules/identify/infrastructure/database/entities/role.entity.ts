import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';
import { RolePermissionEntity } from './role-permission.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  // @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  // userRoles: UserRoleEntity[];

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.role,
  )
  rolePermissions: RolePermissionEntity[];
}
