import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionRepositoryPort } from '../../../application/permission/permission.repository.port';
import { Logger } from '@nestjs/common';

export class PermissionRepository implements PermissionRepositoryPort {
  private readonly logger = new Logger(PermissionRepository.name);

  constructor(
    @InjectRepository(PermissionEntity as any)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findBy(names: string[]): Promise<PermissionEntity[]> {
    this.logger.log('Finding permissions by names: ', names);
    const permissions = await this.permissionRepository.findBy({
      name: In(names),
    });
    this.logger.log('Permissions found: ', permissions);
    return permissions;
  }

  async getPermissions(): Promise<PermissionEntity[]> {
    this.logger.log('Retrieving all permissions');
    const permissions = await this.permissionRepository.find();
    this.logger.log('All permissions retrieved: ', permissions);
    return permissions;
  }
}
