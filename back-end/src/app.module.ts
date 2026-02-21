import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacccineController } from './vaccine.controller';
import { VacccineService } from './vaccine.service';

@Module({
  imports: [],
  controllers: [AppController, VacccineController],
  providers: [AppService, VacccineService],
})
export class AppModule {}
