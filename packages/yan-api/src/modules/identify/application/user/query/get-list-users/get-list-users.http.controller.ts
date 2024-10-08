import { Controller, Get, Logger, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetListUsersQuery } from './get-list-users.query';
import { GetListUsersRequestDto, SortDto } from './get-list-users.request.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';

@ApiTags('users')
@Controller('users')
export class GetListUsersHttpController {
  private readonly logger = new Logger(GetListUsersHttpController.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: () => SortDto,
    description: 'Sort options',
  })
  @ApiQuery({
    name: 'text',
    required: false,
    type: String,
    description: 'Search text for both fields username and email',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: BaseResponse,
  })
  async getUsers(@Query() getListUsersDto: GetListUsersRequestDto) {
    this.logger.log(
      'GetListUsers request received with query: ',
      getListUsersDto,
    );

    const result = await this.queryBus.execute(
      new GetListUsersQuery(getListUsersDto),
    );

    this.logger.log('GetListUsers query executed successfully');

    return result;
  }
}
