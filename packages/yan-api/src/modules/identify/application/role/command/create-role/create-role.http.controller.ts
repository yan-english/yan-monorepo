import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleRequestDto } from './create-role.request.dto';

@ApiTags('roles')
@Controller('roles')
export class CreateRoleHttpController {
  private readonly logger = new Logger(CreateRoleHttpController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createRole(
    @Body() createRoleRequest: CreateRoleRequestDto,
  ): Promise<string> {
    this.logger.log(
      'CreateRole request received with data: ',
      createRoleRequest,
    );

    await this.commandBus.execute(new CreateRoleCommand(createRoleRequest));

    this.logger.log('CreateRole command executed successfully');

    return 'Role created successfully';
  }
}
