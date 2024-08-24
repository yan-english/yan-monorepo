import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionRepositoryPort } from '../../../application/permission/permission.repository.port';

export class PermissionRepository implements PermissionRepositoryPort {
  constructor(
    @InjectRepository(PermissionEntity as any)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findBy(names: string[]): Promise<PermissionEntity[]> {
    return await this.permissionRepository.findBy({ name: In(names) });
  }

  async getPermissions(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }
}
