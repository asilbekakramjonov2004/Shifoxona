import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientsService.activatePatient(link);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  @Patch(':id/refresh-token')
  async updateRefreshToken(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRefreshTokenDto: UpdateRefreshTokenDto
  ) {
    return await this.patientsService.updateRefreshToken(id, updateRefreshTokenDto.hashed_refresh_token);
  }
}
