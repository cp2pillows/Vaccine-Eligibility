import { Module } from '@nestjs/common';
import { VacccineController } from './vaccine/vaccine.controller';
import { VacccineService } from './vaccine/vaccine.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [VacccineController, UserController],
  providers: [VacccineService, UserService],
})
export class AppModule {}
