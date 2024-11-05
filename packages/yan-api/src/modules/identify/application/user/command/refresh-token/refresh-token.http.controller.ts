import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { LoginResponse } from '../../user.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

class RefreshTokenRequestDto {
  refreshToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class RefreshTokenHttpController {
  private readonly logger = new Logger(RefreshTokenHttpController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body() refreshTokenRequestDto: RefreshTokenRequestDto): Promise<BaseResponse<LoginResponse>> {
    this.logger.log('Refresh token request received');

    try {
      const result = await this.commandBus.execute(new RefreshTokenCommand(refreshTokenRequestDto.refreshToken));
      return new BaseResponse<LoginResponse>('', 'Tokens refreshed successfully', result);
    } catch (error) {
      this.logger.error('Error refreshing token: ', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}