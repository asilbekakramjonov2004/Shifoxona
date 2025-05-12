import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/models/patient.model';
import { DoctorsModule } from './doctors/doctors.module';
import { IllnessModule } from './illness/illness.module';
import { Doctor } from './doctors/models/doctor.model';
import { Illness } from './illness/models/illness.model';
import { LabTestsModule } from './lab-tests/lab-tests.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { LabTest } from './lab-tests/models/lab-test.model';
import { Feedback } from './feedbacks/models/feedback.model';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicationsModule } from './medications/medications.module';
import { Medication } from './medications/models/medication.model';
import { Appointment } from './appointments/models/appointment.model';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { MedicalRecord } from './medical-records/models/medical-record.model';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { Prescription } from './prescriptions/models/prescription.model';
import { InsuranceModule } from './insurance/insurance.module';
import { Insurance } from './insurance/models/insurance.model';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/models/payment.model';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/auth.guard';


@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Admin, Patient, Doctor, Illness, LabTest, Feedback, Medication, Appointment, MedicalRecord, Prescription, Insurance, Payment],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: '1d' },
    }),

    AdminModule,
    PatientsModule,
    DoctorsModule,
    IllnessModule,
    LabTestsModule,
    FeedbacksModule,
    AppointmentsModule,
    MedicationsModule,
    MedicalRecordsModule,
    PrescriptionsModule,
    InsuranceModule,
    PaymentsModule,
    AuthModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [JwtAuthGuard], // yoki strategy
  exports: [JwtModule, JwtAuthGuard], // <-- Shart
})
export class AppModule {}
