import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Injectable()
export class MedicalRecordsService {
  constructor(@InjectModel(MedicalRecord) private medicalRecordModel: typeof MedicalRecord,
  private readonly appointmentsService: AppointmentsService,
) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const { appointmentId } = createMedicalRecordDto;
    const appointment = await this.appointmentsService.findOne(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return this.medicalRecordModel.create(createMedicalRecordDto)
  }

  findAll() {
    return this.medicalRecordModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.medicalRecordModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const upd = await this.medicalRecordModel.update(updateMedicalRecordDto, { where: { id }, returning: true    });
    return upd[1][0]
  }

  remove(id: number) {
    return this.medicalRecordModel.destroy({ where: { id } });
  }
}
