import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {RolePermissionEntity} from "./role-permission.entity";

@Entity("permissions")
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.permission)
    rolePermissions: RolePermissionEntity[];
}