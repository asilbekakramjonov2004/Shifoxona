import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Medication } from './models/medication.model';

@Injectable()
export class MedicationsService {
  constructor(@InjectModel(Medication) private medicationModel: typeof Medication) {}
  create(createMedicationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMedicationDto);
  }

  findAll() {
    return this.medicationModel.findAll();
  }

  findOne(id: number) {
    return this.medicationModel.findOne({ where: { id } });
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationModel.update(updateMedicationDto, { where: { id } });
  }

  remove(id: number) {
    return this.medicationModel.destroy({ where: { id } });
  }
}
