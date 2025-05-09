import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import * as bcrypt from "bcrypt";
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor,
  private readonly mailService: MailService
 ){}
  async create(createDoctorDto: CreateDoctorDto) {
      const { password } = createDoctorDto;
  
      const hashed_password = await bcrypt.hash(password, 7);
      const newDoctor = await this.doctorModel.create({
        ...createDoctorDto,
        hashed_password,
      });

      try {
        await this.mailService.sendMailDoctor(newDoctor);
      } catch (error) {
        console.log(error);
        throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
      }
      return newDoctor


  }

  findAll() {
      return this.doctorModel.findAll({ include: { all: true } });
    }
  
    findOne(id: number) {
      return this.doctorModel.findByPk(id, { include: { all: true } });
    }
  
    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
      const updatedDoctor = await this.doctorModel.update(updateDoctorDto, {where: {id}, returning: true})
      return updatedDoctor[1][0]
    }
  
    remove(id: number) {
      return this.doctorModel.destroy({ where: { id } });
    }
  
    async updateRefreshToken(id: number, hashed_refresh_token: string) {
      const updatedRefreshtoken = await this.doctorModel.update(
        {hashed_refresh_token},
        {where:
          {id}
        }
      );
      return updatedRefreshtoken;
    }
  
    async activateDoctor(link: string) {
      if (!link) {
        throw new BadRequestException("Activation link not found");
      }
  
      const updateDoctor = await this.doctorModel.update(
        { is_active: true },
        {
          where: {
            activation_link: link,
            is_active: false,
          },
          returning: true,
        }
      );
  
      if (!updateDoctor[1][0]) {
        throw new BadRequestException("Doctor already activated");
      }
  
      return {
        message: "Doctor activated successfully",
        is_active: updateDoctor[1][0].is_active,
      };
    }

    findUserByEmail(email: string){
      return this.doctorModel.findOne({where: {email}})
    }
}
