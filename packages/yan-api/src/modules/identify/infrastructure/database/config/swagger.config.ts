import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import path from 'path';

export async function swaggerConfig(
  app: INestApplication,
  callback: (path: string, document: OpenAPIObject) => void,
) {
  const config = new DocumentBuilder()
    .setTitle('Cerberus API 🚀🚀')
    .setDescription('Cerberus API Documentation 📝📝')
    .addServer('http://localhost:2002/api', 'Local Development')
    .addServer('https://cerberus-api.herokuapp.com', 'Production')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'docs';
  fs.writeFileSync(
    path.join(__dirname, './swagger-spec.json'),
    JSON.stringify(document, null, '\t'),
  );
  console.log(
    `Swagger spec written to ${path.join(__dirname, './swagger-spec.json')}`,
  );
  SwaggerModule.setup(swaggerPath, app, document);
  callback(swaggerPath, document);
}
