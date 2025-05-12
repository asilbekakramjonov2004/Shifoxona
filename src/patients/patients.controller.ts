import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtSelfGuard } from 'src/common/guards/self.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("admin", "superadmin", "patient")
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientsService.activatePatient(link);
  }

  @UseGuards( JwtAuthGuard, RolesGuard,JwtSelfGuard)
  @Roles("admin", "superadmin", "patient")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards( JwtAuthGuard, RolesGuard,JwtSelfGuard)
  @Roles("admin", "superadmin", "patient")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards( JwtAuthGuard, RolesGuard,JwtSelfGuard)
  @Roles("admin", "superadmin", "patient")
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
