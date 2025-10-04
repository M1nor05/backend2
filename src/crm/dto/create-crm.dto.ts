import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCRMRequestDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  businessType: string;

  @IsNotEmpty()
  @IsString()
  businessSize: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
