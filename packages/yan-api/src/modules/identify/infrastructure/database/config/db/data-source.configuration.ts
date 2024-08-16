import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DBConfiguration } from '../configuration';

const configuration = DBConfiguration();

export const DataSourceConfiguration = {
  type: 'postgres',
  host: configuration.DATABASE_HOST,
  port: configuration.DATABASE_PORT,
  database: configuration.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true',
  username: configuration.DATABASE_USERNAME,
  password: configuration.DATABASE_PASSWORD, // The same password that use to run postgres image on docker.
  namingStrategy: new SnakeNamingStrategy(),
} as const;
