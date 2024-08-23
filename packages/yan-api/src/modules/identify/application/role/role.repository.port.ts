import { RepositoryPort } from '../../../../commons/ddd/repository.port';
import { Role } from '../../domain/entities/role';
import {RoleEntity} from "../../infrastructure/database/entities/role.entity";

export interface RoleRepositoryPort extends RepositoryPort<Role> {
  createRole(role: Role): Promise<RoleEntity>;
  findByName(name: string): Promise<Role>;
}
