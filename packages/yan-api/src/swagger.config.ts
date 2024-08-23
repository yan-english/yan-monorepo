import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Yan Flashcards API 🚀🚀')
    .setDescription('Yan Flashcards API Documentation 📝📝')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'docs';
  SwaggerModule.setup(swaggerPath, app, document);
}
