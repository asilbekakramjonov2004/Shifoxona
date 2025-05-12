import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtSelfGuard } from 'src/common/guards/self.guard';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("patient")
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.feedbacksService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( "superadmin", "admin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
