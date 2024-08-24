import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListRolesQuery } from './get-list-roles.query';
import { Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../../infrastructure/di/role.di-tokens';
import { RoleRepositoryPort } from '../../role.repository.port';
import { RoleEntity } from '../../../../infrastructure/database/entities/role.entity';

@QueryHandler(GetListRolesQuery)
export class GetListRolesHandler implements IQueryHandler<GetListRolesQuery> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}
  async execute(query: GetListRolesQuery): Promise<RoleEntity[]> {
    return await this.roleRepository.findAll(query);
  }
}
