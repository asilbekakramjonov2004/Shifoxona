import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Insurance } from './models/insurance.model';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [SequelizeModule.forFeature([Insurance]), PatientsModule], 
  controllers: [InsuranceController],
  providers: [InsuranceService],
  exports: [InsuranceService], 
})
export class InsuranceModule {}
