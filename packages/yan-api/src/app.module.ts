import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentifyModule } from './modules/identify/identify.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/identify/infrastructure/database/config/db/database.module';
import { JwtModule } from '@nestjs/jwt';

const modules = [IdentifyModule];
@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({
      secret: 'yan-flashcards', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' }, // Example expiration time
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
