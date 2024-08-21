import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';

export class PermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity as any)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}
}
