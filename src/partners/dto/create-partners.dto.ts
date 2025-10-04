import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  businessName: string;

  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

 
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  
  @IsString()
  phone: string;
}
