import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;
}


export class UpdateBudgetDto {
  @IsOptional()
  @IsNumber()
  income?: number;
}