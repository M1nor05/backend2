import { IsNotEmpty, IsString, IsNumber, IsObject, IsEnum } from 'class-validator';

export enum BusinessType {
  SAVDO = 'savdo',
  ISHLAB_CHIQARISH = 'ishlab_chiqarish',
  XIZMAT = 'xizmat',
}

export class CreateBusinessAnalysisDto {
    @IsString()
  @IsNotEmpty()
  date: string; // 1-12

  @IsEnum(BusinessType)
  businessType: BusinessType;

  @IsObject()
  data: Record<string, number>; // Dinamik form ma’lumotlari
}
