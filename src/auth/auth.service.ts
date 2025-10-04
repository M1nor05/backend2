import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User } from 'src/database/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from './email.service';
// <<-- biz yozgan mail service

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService, // faqat shu kifoya
  ) {}

  private async generateTokens(user: User) {
    const payload = { id: user.id, email: user.email, businessType: user.businessType };

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

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new UnauthorizedException('Email already taken');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hash });
    await this.userRepo.save(user);

    const tokens = await this.generateTokens(user);
    const { password, ...result } = user;

    return { user: result, access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Password wrong');

    const tokens = await this.generateTokens(user);
    const { password, ...result } = user;

    return { user: result, access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userRepo.findOne({ where: { id: payload.id } });
      if (!user) throw new UnauthorizedException('User not found');

      const tokens = await this.generateTokens(user);
      return { access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // 👉 Yangi forgot password
 // auth/auth.service.ts
async forgotPassword(email: string) {
  const user = await this.userRepo.findOne({ where: { email } });
  if (!user) throw new NotFoundException(`No user found for email: ${email}`);
const newPasswordPlain = Math.random().toString(36).slice(-8); // yangi parol generatsiya qilish
const hash = await bcrypt.hash(newPasswordPlain, 10);
user.password = hash;
await this.userRepo.save(user);

// Foydalanuvchiga email yuborish
await this.mailService.sendMail(
  email,                                // qabul qiluvchi
  'Yangi parolingiz',                   // subject
  `Sizning yangi parolingiz: ${newPasswordPlain}`, // text
  `<p>Sizning yangi parolingiz: <b>${newPasswordPlain}</b></p>` // html
);

return { message: 'Yangi parol emailingizga yuborildi' };

}

}
