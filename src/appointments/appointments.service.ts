import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { IllnessService } from 'src/illness/illness.service';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private appointmentModel: typeof Appointment,
  private readonly patientsService: PatientsService,
  private readonly doctorsService: DoctorsService,
  private readonly illnessService: IllnessService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { patientId, doctorId, illnessId } = createAppointmentDto;
    const patient = await this.patientsService.findOne(patientId);
    const doctor = await this.doctorsService.findOne(doctorId);
    const illness = await this.illnessService.findOne(illnessId);

    if (!patient || !doctor || !illness) {
      throw new Error('Invalid patient, doctor or illness ID');
    }

    return this.appointmentModel.create(createAppointmentDto);
  }


  findAll() {
    return this.appointmentModel.findAll();
  }

  findOne(id: number) {
    return this.appointmentModel.findOne({ where: { id } });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentModel.update(updateAppointmentDto, { where: { id } });
  }

  remove(id: number) {
    return this.appointmentModel.destroy({ where: { id } });
  }
}
