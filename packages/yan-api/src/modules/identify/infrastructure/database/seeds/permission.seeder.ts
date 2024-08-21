import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PermissionEntity } from '../entities/permission.entity';
import permissionData from './permission-data';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

export default class CreatePermissions implements Seeder {
  public async run(
    ds: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factory: SeederFactoryManager,
  ): Promise<any> {
    console.log('🌱 Seeding permissions...');
    const permissionRepository = ds.getRepository(PermissionEntity);

    for (const permission of permissionData) {
      await permissionRepository.save(permission);
    }
  }
}
