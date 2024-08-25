import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';
import { RoleCacheService } from './commons/third-party/redis/redis.service';
import { HttpExceptionFilter } from './commons/application/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  const roleCacheService = app.get(RoleCacheService);
  await roleCacheService.cacheRoles();

  await swaggerConfig(app);

  await app.listen(3000);
}
bootstrap().then(() =>
  console.log('Server is running on http://localhost:3000'),
);
