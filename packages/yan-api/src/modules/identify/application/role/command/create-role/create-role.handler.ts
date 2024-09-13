import { CreateRoleCommand } from './create-role.command';
import { Role } from '../../../../domain/entities/role';
import { RoleRepositoryPort } from '../../role.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { RoleEntity } from '../../../../infrastructure/database/entities/role.entity';
import {
  PERMISSION_EXPIRATION,
  PERMISSIONS_PREFIX,
} from '../../../../../../commons/application/constants';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  private readonly logger = new Logger(CreateRoleHandler.name);

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(command: CreateRoleCommand) {
    this.logger.log('Executing CreateRoleCommand with data: ', command);

    const role = Role.create(
      command.name,
      command.description,
      command.permissions,
    );

    if (await this.roleRepository.findByName(command.name)) {
      this.logger.warn('Role already exists with name: ' + command.name);
      throw new BadRequestException('Role already exists');
    }

    if (command.permissions.length === 0) {
      this.logger.warn('Permissions are required but none provided');
      throw new BadRequestException('Permissions are required');
    }

    const roleEntity: RoleEntity = await this.roleRepository.createRole(role);
    this.logger.log('Role created successfully with ID: ' + roleEntity.id);

    const permissions = roleEntity.rolePermissions.map((rp) => rp.permission);
    await this.cacheManager.set(
      `${PERMISSIONS_PREFIX}${roleEntity.name}`,
      permissions,
      PERMISSION_EXPIRATION,
    );
    this.logger.log(
      'Permissions cached successfully for role: ' + roleEntity.name,
    );

    this.logger.log(
      'CreateRoleCommand executed successfully returning role ID: ' +
        roleEntity.id,
    );
    return roleEntity.id;
  }
}
