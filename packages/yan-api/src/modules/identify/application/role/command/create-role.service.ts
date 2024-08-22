import { CreateRoleCommand } from './create-role.command';
import { Role } from '../../../domain/entities/role';
import { RoleRepositoryPort } from '../role.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../infrastructure/di/role.di-tokens';

@CommandHandler(CreateRoleCommand)
export class CreateRoleService implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(command: CreateRoleCommand) {
    const role = Role.create(
      command.name,
      command.description,
      command.permissionIds,
    );
    return await this.roleRepository.createRole(role);
  }
}
