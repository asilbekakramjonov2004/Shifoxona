import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from './models/feedback.model';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class FeedbacksService {
  constructor(@InjectModel(Feedback) private feedbackModel: typeof Feedback,
    private readonly patientService: PatientsService, ){}
  async create(createFeedbackDto: CreateFeedbackDto) {
      const {patientId} = createFeedbackDto
  
      const patient = await this.patientService.findOne(patientId);
  
      if (!patient) {
        throw new Error('Patient not found');
      }
  
      return await this.feedbackModel.create(createFeedbackDto);
    }
  
    findAll() {
      return this.feedbackModel.findAll({ include: { all: true } });
    }
  
    findOne(id: number) {
      return this.feedbackModel.findByPk(id, { include: { all: true } });
    }
  
    async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
      const updatedFeedback = await this.feedbackModel.update(updateFeedbackDto, {where: {id}, returning: true})
      return updatedFeedback[1][0]
    }
  
    remove(id: number) {
      return this.feedbackModel.destroy({ where: { id } });
    }
}
