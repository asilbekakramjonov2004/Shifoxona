import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [SequelizeModule.forFeature([MedicalRecord]), AppointmentsModule], 
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
