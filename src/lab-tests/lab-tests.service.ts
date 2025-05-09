import { Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class LabTestsService {
  constructor(@InjectModel(LabTest) private labTestModel: typeof LabTest,
  private readonly patientService: PatientsService,
  private readonly doctorService: DoctorsService,
){}
  async create(createLabTestDto: CreateLabTestDto) {
    const {patientId, doctorId} = createLabTestDto

    const patient = await this.patientService.findOne(patientId);
    const doctor = await this.doctorService.findOne(doctorId);

    if (!patient || !doctor) {
      throw new Error('Patient or Doctor not found');
    }

    return await this.labTestModel.create(createLabTestDto);
  }

  findAll() {
    return this.labTestModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.labTestModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateLabTestDto: UpdateLabTestDto): Promise<LabTest> {
    const updatedLabTest = await this.labTestModel.update(updateLabTestDto, {where: {id}, returning: true})
    return updatedLabTest[1][0]
  }

  remove(id: number) {
    return this.labTestModel.destroy({ where: { id } });
  }
}
