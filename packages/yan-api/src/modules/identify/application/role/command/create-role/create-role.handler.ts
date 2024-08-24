import { CreateRoleCommand } from './create-role.command';
import { Role } from '../../../../domain/entities/role';
import { RoleRepositoryPort } from '../../role.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { RoleEntity } from '../../../../infrastructure/database/entities/role.entity';
import { PERMISSIONS_PREFIX } from '../../../../../../commons/application/constants';

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
      command.permissions,
    );

    if (await this.roleRepository.findByName(command.name)) {
      throw new BadRequestException('Role already exists');
    }

    if (command.permissions.length === 0) {
      throw new BadRequestException('Permissions are required');
    }

    const roleEntity: RoleEntity = await this.roleRepository.createRole(role);
    const permissions = roleEntity.rolePermissions.map((rp) => rp.permission);
    await this.cacheManager.set(
      `${PERMISSIONS_PREFIX}${roleEntity.name}`,
      permissions,
      60 * 60 * 24 * 30,
    );

    return roleEntity.id;
  }
}
