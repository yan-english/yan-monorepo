import {Module, Provider, Type} from '@nestjs/common';
import {CreateUserService} from './application/user/command/create-user/create-user.service';
import {CreateUserHttpController} from './application/user/command/create-user/create-user.http.controller';
import {UserRepository} from './infrastructure/database/repositories/user.repository';
import {UserMapper} from './mapper/user.mapper';
import {CqrsModule} from '@nestjs/cqrs';
import {USER_REPOSITORY} from './infrastructure/di/user.di-tokens';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './infrastructure/database/entities/user.entity';
import {RoleRepository} from "./infrastructure/database/repositories/role.repository";
import {PermissionRepository} from "./infrastructure/database/repositories/permission.repository";
import {RoleMapper} from "./mapper/role.mapper";
import {CreateRoleService} from "./application/role/command/create-role.service";
import {CreateRoleHttpController} from "./application/role/command/create-role.http.controller";
import {Controller} from "@nestjs/common/interfaces";
import {ROLE_REPOSITORY} from "./infrastructure/di/role.di-tokens";
import {PERMISSION_REPOSITORY} from "./infrastructure/di/permission.di-tokens";
import {RoleEntity} from "./infrastructure/database/entities/role.entity";
import {PermissionEntity} from "./infrastructure/database/entities/permission.entity";
import {RolePermissionEntity} from "./infrastructure/database/entities/role-permission.entity";
import {UserRoleEntity} from "./infrastructure/database/entities/user-role.entity";

const repositories: Provider[] = [
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository,
    },
    {
        provide: ROLE_REPOSITORY,
        useClass: RoleRepository,
    },
    {
        provide: PERMISSION_REPOSITORY,
        useClass: PermissionRepository,
    }
];
const mappers: Provider[] = [UserMapper, RoleMapper];
const commandHandlers: Provider[] = [CreateUserService, CreateRoleService];
const controllers: Type[] = [CreateUserHttpController, CreateRoleHttpController];

@Module({
    imports: [CqrsModule,
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity,
            PermissionEntity,
            RolePermissionEntity,
            UserRoleEntity] as any,
        )],
    controllers: [...controllers],
    providers: [...repositories, ...mappers, ...commandHandlers],
})
export class IdentifyModule {
}
