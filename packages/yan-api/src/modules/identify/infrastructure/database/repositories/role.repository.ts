import { RoleRepositoryPort } from '../../../application/role/role.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { In, Repository } from 'typeorm';
import { Role } from '../../../domain/entities/role';
import { RoleMapper } from '../../../mapper/role.mapper';
import { Inject } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../../di/permission.di-tokens';
import { PermissionRepository } from './permission.repository';
import { RolePermissionEntity } from '../entities/role-permission.entity';

export class RoleRepository implements RoleRepositoryPort {
  constructor(
    @InjectRepository(RoleEntity as any)
    private readonly roleRepository: Repository<RoleEntity>,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async createRole(role: Role): Promise<void> {
    const roleMapper = new RoleMapper();
    const roleEntity = roleMapper.toPersistence(role);
    const permissions = await this.permissionRepository.findBy(
      role.getPermissions(),
    );
    roleEntity.rolePermissions = permissions.map((permission) => {
      const rolePermissionEntity = new RolePermissionEntity();
      rolePermissionEntity.permission = permission;
      rolePermissionEntity.role = roleEntity;
      return rolePermissionEntity;
    });
    await this.roleRepository.save(roleEntity);
  }

  async findByName(name: string): Promise<Role> {
    const roleEntity = await this.roleRepository.findOne({ where: { name } });
    const roleMapper = new RoleMapper();
    return roleEntity ? roleMapper.toDomain(roleEntity) : null;
  }

  async findBy(listName: string[]): Promise<RoleEntity[]> {
    return await this.roleRepository.findBy({ name: In(listName) });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    return Promise.resolve(undefined);
  }
}
