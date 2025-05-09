import { Module } from '@nestjs/common';
import { IllnessService } from './illness.service';
import { IllnessController } from './illness.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Illness } from './models/illness.model';

@Module({
  imports: [SequelizeModule.forFeature([Illness])],
  controllers: [IllnessController],
  providers: [IllnessService],
  exports: [IllnessService]
})
export class IllnessModule {}
