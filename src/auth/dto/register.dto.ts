// auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsString } from 'class-validator';

export enum BusinessType {
  SAVDO = 'Savdo',
  ISHLAB_CHIQARISH = 'Ishlab chiqarish',
  XIZMAT = 'Xizmat',
}

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
    password: string;
    
  @MinLength(6)
  confirmPassword: string;

  
  @IsNotEmpty()
  @IsEnum(BusinessType)
    businessType: BusinessType;
    

  @IsOptional()
@IsString()
inn?: string;



}