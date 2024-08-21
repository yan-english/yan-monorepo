import path from 'path';
import { DataSource } from 'typeorm';

import { DataSourceConfiguration } from './data-source.configuration';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

export const dataSource = new DataSource({
  ...DataSourceConfiguration,
  port: parseInt(DataSourceConfiguration.port, 10),
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../migrations/*.{js,ts}'],
  // seeds: [__dirname + '/../../seeds/*.{js,ts}'],
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
