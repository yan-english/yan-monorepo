import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermissionEntity } from './role-permission.entity';

interface ClientAction {
  action: string;
  routes: string[];
}

interface ServerAction {
  action: string;
  routes: string[];
}

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
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
