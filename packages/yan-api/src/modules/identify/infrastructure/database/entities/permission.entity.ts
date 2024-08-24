import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermissionEntity } from './role-permission.entity';

export interface ClientAction {
  action: string;
  routes: string[];
}

export interface ServerAction {
  action: string;
  routes: string[];
}

@Entity('permissions')
export class PermissionEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('json')
  client: ClientAction[];

  @Column('json')
  server: ServerAction[];

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermissionEntity[];
}
