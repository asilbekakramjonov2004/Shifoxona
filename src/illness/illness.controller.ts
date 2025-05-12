import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IllnessService } from './illness.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@Controller('illness')
export class IllnessController {
  constructor(private readonly illnessService: IllnessService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Post()
  create(@Body() createIllnessDto: CreateIllnessDto) {
    return this.illnessService.create(createIllnessDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get()
  findAll() {
    return this.illnessService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.illnessService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles("admin", "superadmin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessService.update(+id, updateIllnessDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles("admin", "superadmin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.illnessService.remove(+id);
  }
}
