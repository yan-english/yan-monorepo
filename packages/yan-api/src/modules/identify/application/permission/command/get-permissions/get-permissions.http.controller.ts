import { Controller, Get, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from './get-permissions.query';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class GetPermissionsHttpController {
  private readonly logger = new Logger(GetPermissionsHttpController.name);

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
    this.logger.log('GetPermissions request received');

    const data = await this.queryBus.execute(new GetPermissionsQuery());

    this.logger.log(
      'GetPermissionsQuery executed successfully with data: ',
      data,
    );

    return new BaseResponse<any>(
      '',
      'Permissions retrieved successfully',
      data,
    );
  }
}
