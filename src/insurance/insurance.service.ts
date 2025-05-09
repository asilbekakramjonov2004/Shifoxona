import { Injectable } from '@nestjs/common';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Insurance } from './models/insurance.model';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class InsuranceService {
  constructor(@InjectModel(Insurance) private insuranceModel: typeof Insurance,
  private readonly patientsService: PatientsService) {}
  
  async create(createInsuranceDto: CreateInsuranceDto) {
    const { patientId } = createInsuranceDto;
    const patient = await this.patientsService.findOne(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return await this.insuranceModel.create(createInsuranceDto);
  }

  findAll() {
    return this.insuranceModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.insuranceModel.findOne({ where: { id }, include: { all: true } });
  }

  update(id: number, updateInsuranceDto: UpdateInsuranceDto) {
    return this.insuranceModel.update(updateInsuranceDto, { where: { id } });
  }

  remove(id: number) {
    return this.insuranceModel.destroy({ where: { id } });
  }
}
