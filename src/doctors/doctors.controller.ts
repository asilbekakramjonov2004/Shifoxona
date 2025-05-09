import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.doctorsService.activateDoctor(link);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

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
