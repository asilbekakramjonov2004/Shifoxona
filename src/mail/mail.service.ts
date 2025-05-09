import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/models/admin.model';
import { Doctor } from 'src/doctors/models/doctor.model';
import { Patient } from 'src/patients/models/patient.model';


@Injectable()
export class MailService {
    constructor(private readonly mailerSerivce: MailerService) {}

    async sendMailPatient(patient:Patient){
        const url = `${process.env.API_HOST}/api/patients/activate/${patient.activation_link}`;
        await this.mailerSerivce.sendMail({
            to: patient.email,
            subject: 'Welcome to Shifoxona app',
            template: './confirmation',
            context: { 
                name: patient.first_name+" "+patient.last_name,
                url,
             }, 
        });
    }


    async sendMailDoctor(doctor:Doctor){
        const url = `${process.env.API_HOST}/api/doctors/activate/${doctor.activation_link}`;
        await this.mailerSerivce.sendMail({
            to: doctor.email,
            subject: 'Welcome to Shifoxona app',
            template: './confirmation',
            context: { 
                name: doctor.first_name+" "+doctor.last_name,
                url,
             }, 
        });
    }

    async sendMailAdmin(admin:Admin){
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        await this.mailerSerivce.sendMail({
            to: admin.email,
            subject: 'Welcome to Shifoxona app',
            template: './confirmation',
            context: { 
                name: admin.name,
                url,
             }, 
        });
    }
}
