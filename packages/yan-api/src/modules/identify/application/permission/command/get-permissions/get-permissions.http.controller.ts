import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from './get-permissions.query';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class GetPermissionsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all permissions' })
  @ApiResponse({
    status: 200,
    description: 'Permissions retrieved successfully',
    type: BaseResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getPermissions() {
    const data = await this.queryBus.execute(new GetPermissionsQuery());
    return new BaseResponse<any>(
      '',
      'Permissions retrieved successfully',
      data,
    );
  }
}
