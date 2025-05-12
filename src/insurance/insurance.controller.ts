import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "patient")
  @Post()
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insuranceService.create(createInsuranceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get()
  findAll() {
    return this.insuranceService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insuranceService.update(+id, updateInsuranceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuranceService.remove(+id);
  }
}
