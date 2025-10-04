import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PlanDto {
  @IsString()
  month: string;

  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateBudgetDto {
  @IsNumber()
  income: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanDto)
  plans: PlanDto[];
}