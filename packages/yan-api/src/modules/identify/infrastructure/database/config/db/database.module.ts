import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST || 'localhost',
          port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
          database: process.env.DATABASE_NAME || 'yan-flashcards',
          username: process.env.DATABASE_USERNAME || 'user',
          password: process.env.DATABASE_PASSWORD || 'password',
          logging: ['query', 'error'],
          autoLoadEntities: true,
          ssl: process.env.DATABASE_SSL === 'true',
          namingStrategy: new SnakeNamingStrategy(),
          entities: [__dirname + '/../../**/*.entity.{js,ts}'],
          migrations: [__dirname + '/../../migrations/*.{js,ts}'],
          // seeds: [__dirname + '/../../seeds/*.{js,ts}'],
        };
      },
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
