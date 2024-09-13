import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListRolesQuery } from './get-list-roles.query';
import { Inject, Logger } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { RoleRepositoryPort } from '../../role.repository.port';

@QueryHandler(GetListRolesQuery)
export class GetListRolesHandler implements IQueryHandler<GetListRolesQuery> {
  private readonly logger = new Logger(GetListRolesHandler.name);

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(query: GetListRolesQuery): Promise<any> {
    this.logger.log('Executing GetListRolesQuery with data: ', query);

    const roles = await this.roleRepository.findAll(query);

    this.logger.log(
      'GetListRolesQuery executed successfully with data: ',
      roles,
    );

    return roles;
  }
}
