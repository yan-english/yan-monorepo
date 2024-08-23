import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await swaggerConfig(app);

  await app.listen(3000);
}
bootstrap().then(() =>
  console.log('Server is running on http://localhost:3000'),
);
