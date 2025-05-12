import { BadRequestException, ForbiddenException, Injectable, Param, ServiceUnavailableException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt";
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin,
  private readonly mailService: MailService
){}
  async create(createAdminDto: CreateAdminDto) {
    const hashed_password = await bcrypt.hash(
      createAdminDto.hashed_password,
      7
    );
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMailAdmin(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto, currentUser: any): Promise<Admin> {
    if (currentUser.role === 'superadmin' && currentUser.id === id) {
      throw new ForbiddenException("Superadmin o'zini o'zi o'zgartira olmaydi olmaydi");
    }
    const updatedAdmin = await this.adminModel.update(updateAdminDto, {where: {id}, returning: true})
    return updateAdminDto[1][0]
  }

  remove(id: number, currentUser: any) {
    if (currentUser.role === 'superadmin' && currentUser.id === id) {
      throw new ForbiddenException("Superadmin o‘zini o‘zi o‘chirib yubora olmaydi");
    }
    return this.adminModel.destroy({where: {id}});
  }

  findUserByEmail(email: string){
    return this.adminModel.findOne({where: {email}})
  }

  async activateAdmin(link: string) {
      if (!link) {
        throw new BadRequestException("Activation link not found");
      }
  
      const updateAdmin = await this.adminModel.update(
        { is_active: true },
        {
          where: {
            activation_link: link,
            is_active: false,
          },
          returning: true,
        } 
      );
  
      if (!updateAdmin[1][0]) {
        throw new BadRequestException("Admin already activated");
      }
  
      return {
        message: "Admin activated successfully",
        is_active: updateAdmin[1][0].is_active,
      };
    }

    async updateRefreshToken(id: number, hashed_refresh_token: string) {
      const updatedRefreshtoken = await this.adminModel.update(
        {hashed_refresh_token},
        {where:
          {id}
        }
      );
      return updatedRefreshtoken;
    }
}
