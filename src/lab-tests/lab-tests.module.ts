import { Module } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { LabTestsController } from './lab-tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [SequelizeModule.forFeature([LabTest]), PatientsModule, DoctorsModule],
  controllers: [LabTestsController],
  providers: [LabTestsService],
})
export class LabTestsModule {}
