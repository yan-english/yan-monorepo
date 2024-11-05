import { Body, ConflictException, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserCommand } from './create-user.command';
import { match, Result } from 'oxide.ts';
import { Id } from '../../../../domain/value-objects/id.vo';
import { UserAlreadyExistsException } from '../../../../domain/exceptions/user-exists.exception';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class CreateUserHttpController {
  private readonly logger = new Logger(CreateUserHttpController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async createUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<BaseResponse<Id>> {
    this.logger.log(
      'CreateUser request received with body: ',
      createUserRequestDto,
    );

    const result: Result<Id, UserAlreadyExistsException> =
      await this.commandBus.execute(
        new CreateUserCommand(createUserRequestDto),
      );

    this.logger.log('CreateUser command executed');

    // Decide what to return based on the result (apply matching pattern)
    return match(result, {
      Ok: (id: Id) => {
        return new BaseResponse<Id>('', 'User created successfully', id);
      },
      Err: (error): BaseResponse<any> => {
        if (error instanceof UserAlreadyExistsException) {
          this.logger.warn('User already exists: ' + error.message);
          throw new ConflictException(error.message);
        }
        this.logger.error('Error creating user: ', error);
        throw error;
      },
    });
  }
}
