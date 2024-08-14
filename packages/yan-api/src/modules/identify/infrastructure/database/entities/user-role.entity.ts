import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {UserEntity} from "./user.entity";
import {RoleEntity} from "./role.entity";

@Entity("user_roles")
export class UserRoleEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => UserEntity, user => user.userRoles)
    user: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.userRoles)
    role: RoleEntity;
}