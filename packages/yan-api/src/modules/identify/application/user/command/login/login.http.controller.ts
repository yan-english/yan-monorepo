import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';

@Controller('auth')
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.commandBus.execute(new LoginCommand(body));
  }
}
