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
import { CreateRoleHandler } from './application/role/command/create-role.handler';
import { CreateRoleHttpController } from './application/role/command/create-role.http.controller';
import { ROLE_REPOSITORY } from './infrastructure/di/role.di-tokens';
import { PERMISSION_REPOSITORY } from './infrastructure/di/permission.di-tokens';
import { RoleEntity } from './infrastructure/database/entities/role.entity';
import { PermissionEntity } from './infrastructure/database/entities/permission.entity';
import { RolePermissionEntity } from './infrastructure/database/entities/role-permission.entity';
import { UserRoleEntity } from './infrastructure/database/entities/user-role.entity';
import { LoginHandler } from './application/user/command/login/loginHandler';
import { LoginHttpController } from './application/user/command/login/login.http.controller';
import { JwtModule } from '@nestjs/jwt';
import { IdentifyDomainService } from './domain/identify.domain-service';
import { JwtService } from './domain/jwt.service';

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
const controllers: Type[] = [
  CreateUserHttpController,
  CreateRoleHttpController,
  LoginHttpController,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      PermissionEntity,
      RolePermissionEntity,
      UserRoleEntity,
    ] as any),
    JwtModule.register({
      secret: 'yan-flashcards', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' }, // Example expiration time
    }),
  ],
  controllers: [...controllers],
  providers: [
    ...repositories,
    ...mappers,
    ...commandHandlers,
    IdentifyDomainService,
    JwtService,
  ],
})
export class IdentifyModule {}
