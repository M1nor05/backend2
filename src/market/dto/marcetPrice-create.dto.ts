import { IsString, IsNumber } from 'class-validator';

export class CreateMarketPriceDto {
  @IsString()
  businessType: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
