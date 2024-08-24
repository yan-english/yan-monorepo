import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserInfoQuery } from './get-user-info.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../../user.repository.port';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserMapper } from '../../../../mapper/user.mapper';
import { GetUserInfoResponseDto } from './get-user-info.response.dto';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(query: GetUserInfoQuery): Promise<GetUserInfoResponseDto> {
    const userEntity = await this.userRepository.findOneById(query.id);

    if (!userEntity) {
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    const userMapper = new UserMapper();
    const userInfo = userMapper.toResponseUserInfo(userEntity);

    return userInfo;
  }
}
