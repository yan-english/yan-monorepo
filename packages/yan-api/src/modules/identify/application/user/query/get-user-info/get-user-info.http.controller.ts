import { Controller, Get, Logger, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserInfoQuery } from './get-user-info.query';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { GetUserInfoResponseDto } from './get-user-info.response.dto';

@Controller('users')
export class GetUserInfoHttpController {
  private readonly logger = new Logger(GetUserInfoHttpController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  async getUserInfoById(
    @Param('id') id: string,
  ): Promise<BaseResponse<GetUserInfoResponseDto>> {
    this.logger.log(`GetUserInfo request received for ID: ${id}`);

    const data = await this.queryBus.execute(new GetUserInfoQuery(id));

    this.logger.log(`User info retrieved successfully for ID: ${id}`);

    return new BaseResponse<GetUserInfoResponseDto>(
      '',
      'User retrieved successfully',
      data,
    );
  }
}
