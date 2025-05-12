import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtSelfGuard } from 'src/common/guards/self.guard';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("superadmin", "admin")
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.doctorsService.activateDoctor(link);
  }

  @UseGuards(JwtSelfGuard, RolesGuard, JwtAuthGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard, RolesGuard, JwtAuthGuard)
  @Roles("admin", "superadmin", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @UseGuards(JwtSelfGuard, RolesGuard, JwtAuthGuard)
  @Roles("admin", "superadmin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }

  @Patch(':id/refresh-token')
    async updateRefreshToken(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRefreshTokenDto: UpdateRefreshTokenDto
    ) {
      return await this.doctorsService.updateRefreshToken(id, updateRefreshTokenDto.hashed_refresh_token);
    }
}
