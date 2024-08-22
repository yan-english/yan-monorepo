import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { LoginResponse } from '../../user.types';

@Controller('auth')
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<BaseResponse<LoginResponse>> {
    const data: LoginResponse = await this.commandBus.execute(
      new LoginCommand(body),
    );

    return new BaseResponse<LoginResponse>(
      '',
      'User logged in successfully',
      data,
    );
  }
}
