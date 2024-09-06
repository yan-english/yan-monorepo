import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionsQuery } from './get-permissions.query';
import { Inject, Logger } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../../../../infrastructure/di/permission.di-tokens';
import { PermissionRepositoryPort } from '../../permission.repository.port';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery>
{
  private readonly logger = new Logger(GetPermissionsHandler.name);

  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  async execute(query: GetPermissionsQuery) {
    this.logger.log('Executing GetPermissionsQuery with data: ', query);

    const permissions = await this.permissionRepository.getPermissions();

    this.logger.log(
      'GetPermissionsQuery executed successfully with data: ',
      permissions,
    );

    return permissions;
  }
}
