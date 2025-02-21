/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from 'src/category/enum/productCategory.enum';
import { UserRole } from '../enum/userRole.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Category must a customer, seller, admin or superadmin',
  })
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  googleId?: string;
}
