// RolePermissionEntity entity
import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {RoleEntity} from "./role.entity";
import {PermissionEntity} from "./permission.entity";

@Entity("role_permissions")
export class RolePermissionEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => RoleEntity, role => role.rolePermissions)
    role: RoleEntity;

    @ManyToOne(() => PermissionEntity, permission => permission.rolePermissions)
    permission: PermissionEntity;
}