import { Module, Provider, Type } from '@nestjs/common';
import { CreateUserHandler } from './application/user/command/create-user/create-user.handler';
import { CreateUserHttpController } from './application/user/command/create-user/create-user.http.controller';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { UserMapper } from './mapper/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from './infrastructure/di/user.di-tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { RoleRepository } from './infrastructure/database/repositories/role.repository';
import { PermissionRepository } from './infrastructure/database/repositories/permission.repository';
import { RoleMapper } from './mapper/role.mapper';
import { CreateRoleHandler } from './application/role/command/create-role/create-role.handler';
import { CreateRoleHttpController } from './application/role/command/create-role/create-role.http.controller';
import { ROLE_REPOSITORY } from './infrastructure/di/role.di-tokens';
import { PERMISSION_REPOSITORY } from './infrastructure/di/permission.di-tokens';
import { RoleEntity } from './infrastructure/database/entities/role.entity';
import { PermissionEntity } from './infrastructure/database/entities/permission.entity';
import { RolePermissionEntity } from './infrastructure/database/entities/role-permission.entity';
import { UserRoleEntity } from './infrastructure/database/entities/user-role.entity';
import { LoginHandler } from './application/user/command/login/login.handler';
import { LoginHttpController } from './application/user/command/login/login.http.controller';
import { JwtModule } from '@nestjs/jwt';
import { IdentifyDomainService } from './domain/identify.domain-service';
import { JwtService } from './domain/jwt.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { GetListRolesHandler } from './application/role/query/get-list-roles/get-list-roles.handler';
import { GetListRolesHttpController } from './application/role/query/get-list-roles/get-list-roles.http.controller';
import { GetUserInfoHttpController } from './application/user/query/get-user-info/get-user-info.http.controller';
import { GetUserInfoHandler } from './application/user/query/get-user-info/get-user-info.handler';
import { GetPermissionsHandler } from './application/permission/command/get-permissions/get-permissions.handler';
import { GetPermissionsHttpController } from './application/permission/command/get-permissions/get-permissions.http.controller';
import { GetListUsersHttpController } from './application/user/query/get-list-users/get-list-users.http.controller';
import { GetListUsersHandler } from './application/user/query/get-list-users/get-list-users.handler';

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
  },
];
const mappers: Provider[] = [UserMapper, RoleMapper];
const commandHandlers: Provider[] = [
  CreateUserHandler,
  CreateRoleHandler,
  LoginHandler,
];
const queryHandlers: Provider[] = [
  GetListRolesHandler,
  GetUserInfoHandler,
  GetPermissionsHandler,
  GetListUsersHandler,
];
const controllers: Type[] = [
  CreateUserHttpController,
  CreateRoleHttpController,
  LoginHttpController,
  GetListRolesHttpController,
  GetUserInfoHttpController,
  GetPermissionsHttpController,
  GetListUsersHttpController,
];

@Module({
  imports: [
    CqrsModule,
    CacheModule.register(<RedisClientOptions>{
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      PermissionEntity,
      RolePermissionEntity,
      UserRoleEntity,
    ] as any),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yan-flashcards', // Replace with an environment variable in production
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '100h' }, // Example expiration time
    }),
  ],
  controllers: [...controllers],
  providers: [
    ...repositories,
    ...mappers,
    ...commandHandlers,
    ...queryHandlers,
    IdentifyDomainService,
    JwtService,
  ],
  exports: [JwtService],
})
export class IdentifyModule {}
