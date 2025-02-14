import { IsEmail, IsString, MinLength, IsEnum} from 'class-validator';
import { AdminRole } from '../enum/adminRole.enum';

export class CreateAdminDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(AdminRole)
  role: AdminRole;
}
