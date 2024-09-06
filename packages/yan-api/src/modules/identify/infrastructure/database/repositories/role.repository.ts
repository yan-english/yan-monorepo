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
import { Inject, Logger } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../../di/permission.di-tokens';
import { PermissionRepository } from './permission.repository';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { GetListRolesQuery } from '../../../application/role/query/get-list-roles/get-list-roles.query';

export class RoleRepository implements RoleRepositoryPort {
  private readonly logger = new Logger(RoleRepository.name);

  constructor(
    @InjectRepository(RoleEntity as any)
    private readonly roleRepository: Repository<RoleEntity>,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async createRole(role: Role): Promise<RoleEntity> {
    this.logger.log('Creating role with data: ', role);
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
    this.logger.log('Role created successfully with ID: ', roleEntity.id);
    return roleEntity;
  }

  async findByName(name: string): Promise<Role> {
    this.logger.log('Finding role by name: ', name);
    const roleEntity = await this.roleRepository.findOne({
      where: { name },
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });
    const roleMapper = new RoleMapper();
    const role = roleEntity ? roleMapper.toDomain(roleEntity) : null;
    this.logger.log('Role found: ', role);
    return role;
  }

  async findBy(listName: string[]): Promise<RoleEntity[]> {
    this.logger.log('Finding roles by names: ', listName);
    const roles = await this.roleRepository.findBy({ name: In(listName) });
    this.logger.log('Roles found: ', roles);
    return roles;
  }

  async findAll(query: GetListRolesQuery): Promise<any> {
    this.logger.log('Finding all roles with query: ', query);
    const { text, page, limit, sort } = query;
    const skip = (page - 1) * limit;
    const options: FindManyOptions<RoleEntity> = {
      where: text ? { name: Like(`%${text}%`) } : {},
      order: { name: sort as FindOptionsOrderValue },
      skip: skip,
      take: limit,
      relations: ['rolePermissions', 'rolePermissions.permission'],
    };
    const [data, count] = await this.roleRepository.findAndCount(options);
    this.logger.log('Roles found: ', { data, count });
    return { data, count };
  }

  async findOneById(id: string): Promise<RoleEntity> {
    this.logger.log('Finding role by ID: ', id);
    const role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });
    this.logger.log('Role found: ', role);
    return role;
  }
}
