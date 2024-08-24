import 'reflect-metadata';
import { DataSource } from 'typeorm';
import CreatePermissions from './permission.seeder';
import { DataSourceConfiguration } from '../config/db/data-source.configuration';
import CreateRoles from './role.seeder';
import CreateUser from './user.seeder';

const runSeeder = async () => {
  const dataSource = new DataSource({
    ...DataSourceConfiguration,
    port: parseInt(DataSourceConfiguration.port, 10),
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../../migrations/*.{js,ts}'],
  });
  await dataSource.initialize();
  console.log('Data Source has been initialized!');

  const permissionSeeder = new CreatePermissions();
  await permissionSeeder.run(dataSource);
  console.log('Permissions have been seeded!');

  const roleSeeder = new CreateRoles();
  await roleSeeder.run(dataSource);
  console.log('Roles have been seeded!');

  const userSeeder = new CreateUser();
  await userSeeder.run(dataSource);
  console.log('User has been seeded!');
};

runSeeder().catch((error) => console.error('Error running seeder:', error));
