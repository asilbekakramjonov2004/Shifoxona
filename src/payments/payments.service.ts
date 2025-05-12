import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PatientsService } from 'src/patients/patients.service';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { InsuranceService } from 'src/insurance/insurance.service';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment,
  private readonly patientsService: PatientsService,
  private readonly appointmentsService: AppointmentsService, 
  private readonly insuranceService: InsuranceService,
  
) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const { patientId, appointmentId, insuranceId } = createPaymentDto;
    const patient = await this.patientsService.findOne(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }
    const appointment = await this.appointmentsService.findOne(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    const insurance = await this.insuranceService.findOne(insuranceId);
    if (!insurance) {
      throw new Error('Insurance not found');
    }
    const payment = await this.paymentModel.create(createPaymentDto);
    return payment;
  }

  findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const upd = await this.paymentModel.update(updatePaymentDto, { where: { id }, returning: true});
    return upd[1][0]
  }

  remove(id: number) {
    return this.paymentModel.destroy({ where: { id } });
  }
}
