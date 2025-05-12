import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(JwtAuthGuard)

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctors")
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctors")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctors")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctors")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
