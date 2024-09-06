import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../../domain/entities/user';
import { UserRepositoryPort } from '../../user.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Logger,
} from '@nestjs/common';
import { UserAlreadyExistsException } from '../../../../domain/exceptions/user-exists.exception';
import { Id } from '../../../../domain/value-objects/id.vo';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { RoleRepositoryPort } from '../../../role/role.repository.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<Id, UserAlreadyExistsException>> {
    this.logger.log('Executing CreateUserCommand with data: ', command);

    const user = User.create(command);

    const userEntity = await this.userRepository.findByEmail(command.email);
    if (userEntity) {
      this.logger.warn('User already exists with email: ' + command.email);
      throw new ConflictException('User already exists');
    }

    for (const role of command.roles) {
      const roleEntity = await this.roleRepository.findByName(role);
      if (!roleEntity) {
        this.logger.warn(`Role with name ${role} does not exist`);
        throw new BadRequestException(
          `Role with name is: ${role} does not exist`,
        );
      }
    }

    try {
      await this.userRepository.createUser(user);
      this.logger.log(
        'User created successfully with ID: ' + user.getId().value,
      );
      return Ok(user.getId());
    } catch (error: any) {
      this.logger.error('Error creating user: ', error);
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsException(error));
      }
      throw error;
    }
  }
}
