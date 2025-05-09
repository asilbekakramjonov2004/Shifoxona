import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';
import { MedicationsService } from 'src/medications/medications.service';
import { MedicalRecordsService } from 'src/medical-records/medical-records.service';

@Injectable()
export class PrescriptionsService {
  constructor(@InjectModel(Prescription) private prescriptionModel: typeof Prescription,
  private readonly medicalRecordsService: MedicalRecordsService,
  private readonly medicationsService: MedicationsService,
) {}
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const { medicalRecordId, medicationId } = createPrescriptionDto;
    const medicalRecord = await this.medicalRecordsService.findOne(medicalRecordId);
    const medication = await this.medicationsService.findOne(medicationId);
    if (!medicalRecord) {
      throw new Error('Medical record not found');
    }
    if (!medication) {
      throw new Error('Medication not found');
    }
    return this.prescriptionModel.create(createPrescriptionDto)
  }

  findAll() {
    return this.prescriptionModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.prescriptionModel.findOne({ where: { id }, include: { all: true } });
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.update(updatePrescriptionDto, { where: { id } });
  }

  remove(id: number) {
    return this.prescriptionModel.destroy({ where: { id } });
  }
}
