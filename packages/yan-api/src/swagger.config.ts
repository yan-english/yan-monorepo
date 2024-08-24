import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Yan Flashcards API 🚀🚀')
    .setDescription('Yan Flashcards API Documentation 📝📝')
    .addBearerAuth()
    .setVersion('1.0')
    .addGlobalParameters({
      in: 'header',
      required: true,
      name: 'Authorization',
      schema: {
        example:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'docs';
  SwaggerModule.setup(swaggerPath, app, document);
}
