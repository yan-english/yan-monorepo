import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleRequest } from './create-role.request';

@ApiTags('roles')
@Controller('roles')
export class CreateRoleHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createRole(
    @Body() createRoleRequest: CreateRoleRequest,
  ): Promise<string> {
    await this.commandBus.execute(new CreateRoleCommand(createRoleRequest));

    return 'Role created successfully';
  }
}
