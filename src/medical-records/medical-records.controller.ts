import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
