import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMarketPriceDto {
  @IsOptional()
  @IsString()
  businessType?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
