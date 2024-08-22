import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentifyModule } from './modules/identify/identify.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/identify/infrastructure/database/config/db/database.module';

const modules = [IdentifyModule];
@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
