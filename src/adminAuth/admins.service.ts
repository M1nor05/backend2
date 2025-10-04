// auth/admin-auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Admin } from 'src/database/entities/admins.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { LoginAdminDto } from './dto/adminlogin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateTokens(admin: Admin) {
    const payload = { id: admin.id, email: admin.email, role: admin.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    return { accessToken, refreshToken };
  }

  async createAdmin(dto: CreateAdminDto) {
    const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Admin already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ ...dto, password: hash });
    await this.adminRepo.save(admin);

    const tokens = await this.generateTokens(admin);
    const { password, ...result } = admin;

    return {
      admin: result,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (!admin) throw new UnauthorizedException('Admin not found');

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) throw new UnauthorizedException('Password wrong');

    const tokens = await this.generateTokens(admin);
    const { password, ...result } = admin;

    return {
      admin: result,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const admin = await this.adminRepo.findOne({ where: { id: payload.id } });
      if (!admin) throw new UnauthorizedException('Admin not found');

      const tokens = await this.generateTokens(admin);
      return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
