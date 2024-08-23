import { CreateRoleCommand } from './create-role.command';
import { Role } from '../../../domain/entities/role';
import { RoleRepositoryPort } from '../role.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../infrastructure/di/role.di-tokens';
import {RoleEntity} from "../../../infrastructure/database/entities/role.entity";
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: CreateRoleCommand) {
    const role = Role.create(
      command.name,
      command.description,
      command.permissionIds,
    );

    const roleEntity: RoleEntity = await this.roleRepository.createRole(role);
    const permissions = roleEntity.rolePermissions.map(rp => rp.permission);
    await this.cacheManager.set(roleEntity.name, permissions);

    return await this.roleRepository.createRole(role);
  }
}
