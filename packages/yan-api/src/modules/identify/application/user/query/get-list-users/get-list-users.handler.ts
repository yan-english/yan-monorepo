import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListUsersQuery } from './get-list-users.query';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserRepositoryPort } from '../../user.repository.port';
import { BaseResponse } from '../../../../../../commons/application/base-reponse.dto';
import { UserMapper } from '../../../../mapper/user.mapper';

@QueryHandler(GetListUsersQuery)
export class GetListUsersHandler implements IQueryHandler<GetListUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(query: GetListUsersQuery) {
    const { data, count } = await this.userRepository.findAll(query);

    const userMapper: UserMapper = new UserMapper();
    const users = userMapper.toResponseListUsers(data);
    return new BaseResponse('', 'Users retrieved successfully', {
      users,
      count,
    });
  }
}
