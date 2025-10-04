// market-intelligence/dto/get-intelligence.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class GetIntelligenceDto {
  @IsOptional()
  @IsString()
  businessType?: string; // Masalan: "Savdo"
}
