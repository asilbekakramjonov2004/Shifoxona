import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/models/admin.model';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from "bcrypt";
import { Patient } from 'src/patients/models/patient.model';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { Doctor } from 'src/doctors/models/doctor.model';


@Injectable()
export class AuthService {
  constructor(
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
    private readonly adminService: AdminService,
    private readonly jwtServise: JwtService
  ) {}

  async generateTokenForAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      role: admin.role,
      email: admin.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }


  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findUserByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    if (!admin.is_active) {
      throw new BadRequestException("Avval Emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForAdmin(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  
  async signOutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException("Admin not verified");
    }

    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      adminData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Admin logged out succesfully",
    };
    return response;
  }


  async refreshAdmin(adminId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtServise.decode(refresh_token);
    if (adminId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const admin = await this.adminService.findOne(adminId);
    if (!admin || !admin.hashed_refresh_token) {
      throw new NotFoundException("Admin not found");
    }
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Admin refreshed",
      adminId: admin.id,
      access_token: accessToken,
    };
    return response;
  }

  //  patient


  async singUpPatient(createPatientDto: CreatePatientDto) {
    const patient = await this.patientService.findUserByEmail(
      createPatientDto.email
    );
    if (patient) {
      throw new ConflictException({
        message: "Bunday Email foyalnuvchi mavjud",
      });
    }
    const NewUser = await this.patientService.create(createPatientDto);
    return { message: "Foydalanuvchi qo'shildi", userId: NewUser.id };
  }
  async generateTokenForPatient(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
      email: patient.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }


  async signInPatient(signInDto: SignInDto, res: Response) {
    const patient = await this.patientService.findUserByEmail(signInDto.email);
    if (!patient) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    if (!patient.is_active) {
      throw new BadRequestException("Avval Emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      patient.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForPatient(patient);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    patient.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await patient.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }



  async signOutPatient(refreshToken: string, res: Response) {
    const patientData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!patientData) {
      throw new ForbiddenException("Patient not verified");
    }

    const hashed_refresh_token = null;
    await this.patientService.updateRefreshToken(
      patientData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Patiet logged out succesfully",
    };
    return response;
  }


  async refreshPatient(patientId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtServise.decode(refresh_token);
    if (patientId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const patient = await this.patientService.findOne(patientId);
    if (!patient || !patient.hashed_refresh_token) {
      throw new NotFoundException("Patient not found");
    }
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      patient.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForPatient(patient);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.patientService.updateRefreshToken(patient.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Patient refreshed",
      adminId: patient.id,
      access_token: accessToken,
    };
    return response;
  }

  //  Doctor

  async generateTokenForDoctor(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
      email: doctor.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }


  async signInDoctor(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorService.findUserByEmail(signInDto.email);
    if (!doctor) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    if (!doctor.is_active) {
      throw new BadRequestException("Avval Emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      doctor.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForDoctor(doctor);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    doctor.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  
  async signOutDoctor(refreshToken: string, res: Response) {
    const doctorData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!doctorData) {
      throw new ForbiddenException("Doctor not verified");
    }

    const hashed_refresh_token = null;
    await this.doctorService.updateRefreshToken(
      doctorData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Doctor logged out succesfully",
    };
    return response;
  }


  async refreshDoctor(doctorId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtServise.decode(refresh_token);
    if (doctorId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const doctor = await this.doctorService.findOne(doctorId);
    if (!doctor || !doctor.hashed_refresh_token) {
      throw new NotFoundException("Doctor not found");
    }
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      doctor.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenForDoctor(doctor);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.doctorService.updateRefreshToken(doctor.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Doctor refreshed",
      doctor: doctor.id,
      access_token: accessToken,
    };
    return response;
  }
}
