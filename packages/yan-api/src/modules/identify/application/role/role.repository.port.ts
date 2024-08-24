import { RepositoryPort } from '../../../../commons/ddd/repository.port';
import { Role } from '../../domain/entities/role';
import { RoleEntity } from '../../infrastructure/database/entities/role.entity';
import { GetListRolesQuery } from './query/get-list-roles/get-list-roles.query';

export interface RoleRepositoryPort extends RepositoryPort<Role> {
  createRole(role: Role): Promise<RoleEntity>;
  findByName(name: string): Promise<Role>;
  findOneById(id: string): Promise<RoleEntity>;

  findAll(request: GetListRolesQuery): Promise<RoleEntity[]>;
}
