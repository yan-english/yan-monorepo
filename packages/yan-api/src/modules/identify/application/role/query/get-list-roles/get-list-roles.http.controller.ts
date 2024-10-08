import { Controller, Get, Logger, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetListRolesRequestDto } from './get-list-roles.request.dto';
import { GetListRolesQuery } from './get-list-roles.query';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { GetListRolesResponseDto } from './get-list-roles.response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class GetListRolesHttpController {
  private readonly logger = new Logger(GetListRolesHttpController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Get list of roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles retrieved successfully',
    type: BaseResponse<GetListRolesResponseDto>,
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async getRoles(
    @Query() getListRolesDto: GetListRolesRequestDto,
  ): Promise<BaseResponse<GetListRolesResponseDto>> {
    this.logger.log(
      'GetListRoles request received with data: ',
      getListRolesDto,
    );

    const data: GetListRolesResponseDto = await this.queryBus.execute(
      new GetListRolesQuery(getListRolesDto),
    );

    this.logger.log(
      'GetListRolesQuery executed successfully with data: ',
      data,
    );

    return new BaseResponse<GetListRolesResponseDto>(
      '',
      'Roles retrieved successfully',
      data,
    );
  }
}
