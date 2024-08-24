import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserInfoQuery } from './get-user-info.query';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { GetUserInfoResponseDto } from './get-user-info.response.dto';

@Controller('users')
export class GetUserInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  async getUserInfoById(
    @Param('id') id: string,
  ): Promise<BaseResponse<GetUserInfoResponseDto>> {
    const data = await this.queryBus.execute(new GetUserInfoQuery(id));
    return new BaseResponse<GetUserInfoResponseDto>(
      '',
      'User retrieved successfully',
      data,
    );
  }
}
