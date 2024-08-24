import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionsQuery } from './get-permissions.query';
import { Inject } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../../../../infrastructure/di/permission.di-tokens';
import { PermissionRepositoryPort } from '../../permission.repository.port';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery>
{
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetPermissionsQuery) {
    return this.permissionRepository.getPermissions();
  }
}
