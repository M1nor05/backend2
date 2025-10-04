import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admins.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { LoginAdminDto } from './dto/adminlogin.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}


  @Post('create')
  createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminAuthService.createAdmin(dto);
  }

 
  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.adminAuthService.login(dto);
  }


  
  @Post('refresh')
  refresh(@Body('refresh_token') refreshToken: string) {
    return this.adminAuthService.refreshToken(refreshToken);
  }
}
