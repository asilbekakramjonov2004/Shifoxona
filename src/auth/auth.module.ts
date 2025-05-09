import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PatientAuthController } from './patient-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AdminModule } from 'src/admin/admin.module';
import { DoctorAuthController } from './doctor-auth.controller';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [JwtModule.register({global: true}), PatientsModule, DoctorsModule, AdminModule],
  controllers: [PatientAuthController, DoctorAuthController, AdminAuthController, ],
  providers: [AuthService],
})
export class AuthModule {}
