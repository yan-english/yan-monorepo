import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentifyModule } from './modules/identify/identify.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/identify/infrastructure/database/config/db/database.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { IdentifyMiddleware } from './commons/application/identify.middleware';
import { RoleCacheService } from './commons/third-party/redis/redis.service';

const modules = [IdentifyModule, DatabaseModule];

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(<RedisClientOptions>{
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RoleCacheService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(IdentifyMiddleware)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/docs',
          method: RequestMethod.GET,
        },
        // {
        //   path: '/roles',
        //   method: RequestMethod.POST,
        // },
        {
          path: '/users',
          method: RequestMethod.POST,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
