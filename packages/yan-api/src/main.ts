import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';
import { RoleCacheService } from './commons/third-party/redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const roleCacheService = app.get(RoleCacheService);
  await roleCacheService.cacheRoles();

  await swaggerConfig(app);

  await app.listen(3000);
}
bootstrap().then(() =>
  console.log('Server is running on http://localhost:3000'),
);
