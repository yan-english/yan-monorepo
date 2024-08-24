import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PermissionEntity } from '../entities/permission.entity';
import permissionData from './permission-data';

export default class CreatePermissions implements Seeder {
  public async run(ds: DataSource): Promise<any> {
    console.log('🌱 Seeding permissions...');
    const permissionRepository = ds.getRepository(PermissionEntity);

    for (const permission of permissionData) {
      await permissionRepository.save(permission);
    }
  }
}
