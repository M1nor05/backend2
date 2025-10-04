import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './profil.service';
import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { UpdateUserDto } from './dto/update.dto';
;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Profilni olish
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  // Profilni yangilash
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
