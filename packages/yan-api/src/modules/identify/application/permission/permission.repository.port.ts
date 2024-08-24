import { RepositoryPort } from '../../../../commons/ddd/repository.port';
import { PermissionEntity } from '../../infrastructure/database/entities/permission.entity';

export interface PermissionRepositoryPort
  extends RepositoryPort<PermissionEntity> {
  getPermissions(): Promise<PermissionEntity[]>;
}
