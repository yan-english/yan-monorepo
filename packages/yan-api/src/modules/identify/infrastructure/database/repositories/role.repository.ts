import { RoleRepositoryPort } from '../../../application/role/role.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import {
  FindManyOptions,
  FindOptionsOrderValue,
  In,
  Like,
  Repository,
} from 'typeorm';
import { Role } from '../../../domain/entities/role';
import { RoleMapper } from '../../../mapper/role.mapper';
import { Inject } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../../di/permission.di-tokens';
import { PermissionRepository } from './permission.repository';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { GetListRolesQuery } from '../../../application/role/query/get-list-roles/get-list-roles.query';

export class RoleRepository implements RoleRepositoryPort {
  constructor(
    @InjectRepository(RoleEntity as any)
    private readonly roleRepository: Repository<RoleEntity>,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async createRole(role: Role): Promise<RoleEntity> {
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

    return roleEntity;
  }

  async findByName(name: string): Promise<Role> {
    const roleEntity = await this.roleRepository.findOne({
      where: { name },
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });
    const roleMapper = new RoleMapper();
    return roleEntity ? roleMapper.toDomain(roleEntity) : null;
  }

  async findBy(listName: string[]): Promise<RoleEntity[]> {
    return await this.roleRepository.findBy({ name: In(listName) });
  }

  async findAll(query: GetListRolesQuery): Promise<RoleEntity[]> {
    const { text, page, limit, sort } = query;

    const skip = (page - 1) * limit;

    const options: FindManyOptions<RoleEntity> = {
      where: text ? { name: Like(`%${text}%`) } : {},
      order: { name: sort as FindOptionsOrderValue },
      skip: skip,
      take: limit,
      relations: ['rolePermissions', 'rolePermissions.permission'],
    };

    const [data] = await this.roleRepository.findAndCount(options);
    return data;
  }

  async findOneById(id: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: { id: id },
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });
  }
}
