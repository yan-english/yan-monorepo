import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './modules/identify/infrastructure/database/configs/typeorm.config';
import { IdentifyModule } from './modules/identify/identify.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), IdentifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
