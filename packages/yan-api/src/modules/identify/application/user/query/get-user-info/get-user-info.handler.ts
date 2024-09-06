import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserInfoQuery } from './get-user-info.query';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../../user.repository.port';
import { USER_REPOSITORY } from '../../../../infrastructure/di/user.di-tokens';
import { UserMapper } from '../../../../mapper/user.mapper';
import { GetUserInfoResponseDto } from './get-user-info.response.dto';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  private readonly logger = new Logger(GetUserInfoHandler.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(query: GetUserInfoQuery): Promise<GetUserInfoResponseDto> {
    this.logger.log('Executing GetUserInfoQuery with data: ', query);
    this.logger.debug('Query parameters: ' + JSON.stringify(query));

    const userEntity = await this.userRepository.findOneById(query.id);

    if (!userEntity) {
      this.logger.warn(`User with ID ${query.id} not found`);
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    this.logger.debug('User entity retrieved: ' + JSON.stringify(userEntity));

    const userMapper = new UserMapper();
    const userInfo = userMapper.toResponseUserInfo(userEntity);

    this.logger.log('User info retrieved successfully for ID: ' + query.id);

    return userInfo;
  }
}
