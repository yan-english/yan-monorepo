import 'reflect-metadata';
import { DataSource } from 'typeorm';
import CreatePermissions from './permission.seeder';
import { DataSourceConfiguration } from '../config/db/data-source.configuration';

const runSeeder = async () => {
  const dataSource = new DataSource({
    ...DataSourceConfiguration,
    port: parseInt(DataSourceConfiguration.port, 10),
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../../migrations/*.{js,ts}'],
  });
  await dataSource.initialize();
  console.log('Data Source has been initialized!');

  const seeder = new CreatePermissions();
  await seeder.run(dataSource, null);
  console.log('Permissions have been seeded!');
};

runSeeder().catch((error) => console.error('Error running seeder:', error));
