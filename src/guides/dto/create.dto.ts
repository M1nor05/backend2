import { IsString, IsOptional } from 'class-validator';

export class CreateGuideDto {
  @IsString()
  title: string;

  @IsString()
  description: string;


  @IsOptional()
  @IsString()
  link?: string; // optional

  @IsOptional()
  @IsString()
  image?: string;
}
