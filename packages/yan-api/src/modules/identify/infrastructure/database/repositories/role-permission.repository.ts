import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionEntity } from '../entities/role-permission.entity';

export class RolePermissionRepository {
  constructor(
    @InjectRepository(RolePermissionEntity as any)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}
}
