import process from 'node:process';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import fs from 'fs';
import path from 'path';

import { swaggerConfig } from './swagger.config';
import { AppModule } from '../../../../../app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 2002;
  const host = process.env.HOST || 'localhost';
  swaggerConfig(app, (swaggerPath, document) => {
    Logger.log(
      `🚀 Swagger UI is running on: http://${host}:${port}/${swaggerPath}`,
    );
    fs.writeFileSync(
      path.join('apps/cerberus', './swagger-spec.json'),
      JSON.stringify(document, null, 4),
    );
  });
  await app.listen(port);
  await app.close();
}

bootstrap();

// NOTE: this main is to generate the swagger spec file
