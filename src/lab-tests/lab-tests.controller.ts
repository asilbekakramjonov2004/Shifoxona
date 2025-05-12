import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}
