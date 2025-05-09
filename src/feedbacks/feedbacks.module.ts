import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './models/feedback.model';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [SequelizeModule.forFeature([Feedback]), PatientsModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
