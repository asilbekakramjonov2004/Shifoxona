import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { JwtSelfGuard } from 'src/common/guards/self.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("admin", "superadmin", "patient")
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin")
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

   @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

   @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

   @UseGuards(JwtAuthGuard, RolesGuard )
  @Roles("admin", "superadmin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
