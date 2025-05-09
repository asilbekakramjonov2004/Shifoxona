import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import * as bcrypt from "bcrypt";
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private patientModel: typeof Patient,
  private readonly mailService: MailService
){}
  async create(createPatientDto: CreatePatientDto) {
    const { password } = createPatientDto;

    const hashed_password = await bcrypt.hash(password, 7);
    const newPatient = await this.patientModel.create({
      ...createPatientDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMailPatient(newPatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newPatient;
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const updatedPatient = await this.patientModel.update(updatePatientDto, {where: {id}, returning: true})
    return updatedPatient[1][0]
  }

  remove(id: number) {
    return this.patientModel.destroy({ where: { id } });
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedRefreshtoken = await this.patientModel.update(
      {hashed_refresh_token},
      {where:
        {id}
      }
    );
    return updatedRefreshtoken;
  }

  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatePatient = await this.patientModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      } 
    );

    if (!updatePatient[1][0]) {
      throw new BadRequestException("Patient already activated");
    }

    return {
      message: "Patient activated successfully",
      is_active: updatePatient[1][0].is_active,
    };
  }


  findUserByEmail(email: string){
    return this.patientModel.findOne({where: {email}})
  }


}
