import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { JwtSelfGuard } from 'src/common/guards/self.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin")
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.adminService.activateAdmin(link);
  }

  @UseGuards(JwtAuthGuard, JwtSelfGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Req()req: RequestWithUser) {
    return this.adminService.update(+id, updateAdminDto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(':id')
  remove(@Param('id') id: string,
  @Req()req: RequestWithUser
) {
    return this.adminService.remove(+id, req.user);
  }

  @Patch(':id/refresh-token')
    async updateRefreshToken(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateRefreshTokenDto: UpdateRefreshTokenDto
    ) {
      return await this.adminService.updateRefreshToken(id, updateRefreshTokenDto.hashed_refresh_token);
    }
}
