import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin", "doctor")
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin", "doctor")
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
