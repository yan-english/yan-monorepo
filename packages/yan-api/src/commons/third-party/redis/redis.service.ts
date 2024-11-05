import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../../modules/identify/infrastructure/database/entities/role.entity';
import { PERMISSIONS_PREFIX, REFRESH_TOKEN_EXPIRATION } from '../../application/constants';

@Injectable()
export class RoleCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private dataSource: DataSource,
  ) {}

  async cacheRoles() {
    const roleRepository = this.dataSource.getRepository(RoleEntity);
    const roles = await roleRepository.find({
      relations: ['rolePermissions', 'rolePermissions.permission'],
    });

    for (const role of roles) {
      const permissions = role.rolePermissions.map((rp) => rp.permission);
      await this.cacheManager.set(
        `${PERMISSIONS_PREFIX}${role.name}`,
        permissions,
        REFRESH_TOKEN_EXPIRATION,
      );
    }
    console.log('Roles have been cached!');
  }
}
