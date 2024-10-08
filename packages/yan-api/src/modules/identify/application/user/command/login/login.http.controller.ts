import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { LoginResponse } from '../../user.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './login.request.dto';

@ApiTags('auth')
@Controller('auth')
export class LoginHttpController {
  private readonly logger = new Logger(LoginHttpController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: BaseResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() body: LoginRequestDto,
  ): Promise<BaseResponse<LoginResponse>> {
    this.logger.log('Login request received with body: ', body);

    const data: LoginResponse = await this.commandBus.execute(
      new LoginCommand(body),
    );

    this.logger.log('Login command executed successfully');

    return new BaseResponse<LoginResponse>(
      'SUCCESS',
      'User logged in successfully',
      data,
    );
  }
}
