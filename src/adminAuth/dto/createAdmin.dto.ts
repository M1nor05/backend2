import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { AdminRole } from 'src/common/enum/admin.enum';


export class CreateAdminDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(AdminRole)
  role: AdminRole;
}
