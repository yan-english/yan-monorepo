import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../../domain/entities/user';
import { UserRepositoryPort } from '../../user.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { UserAlreadyExistsException } from '../../../../domain/exceptions/user-exists.exception';
import { Id } from '../../../../domain/value-objects/id.vo';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { RoleRepositoryPort } from '../../../role/role.repository.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<Id, UserAlreadyExistsException>> {
    const user = User.create(command);

    const userEntity = await this.userRepository.findByEmail(command.email);
    if (userEntity) {
      throw new ConflictException('User already exists');
    }

    for (const role of command.roles) {
      const roleEntity = await this.roleRepository.findByName(role);
      if (!roleEntity) {
        throw new BadRequestException(
          `Role with name is: ${role} does not exist`,
        );
      }
    }
    // TODO: Need to implement transaction here to ensure that the user is saved to the database
    try {
      await this.userRepository.createUser(user);
      return Ok(user.getId());
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsException(error));
      }
      throw error;
    }
  }
}
