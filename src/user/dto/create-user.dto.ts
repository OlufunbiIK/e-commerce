/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ProductCategory } from 'src/category/enum/productCategory.enum';
import { UserRole } from '../enum/userRole.enum';
import { Cart } from 'src/cart/entities/cart.entity';
import { OneToMany } from 'typeorm';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'User must be a customer, seller, admin or superadmin',
  })
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  googleId?: string;

  // Additional fields for sellers
  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsString()
  storeDescription?: string;

  @IsOptional()
  @IsString()
  storeAddress?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart;
}
