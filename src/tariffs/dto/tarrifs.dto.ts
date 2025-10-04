// dto/activate-tariff.dto.ts
import { IsNumber, IsString } from "class-validator";

export class ActivateTariffDto {
  @IsString()
  tariffName: string;

  @IsNumber()
  durationDays: number; // necha kunlik
}
