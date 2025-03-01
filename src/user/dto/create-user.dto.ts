import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { UserRole } from '../enum/userRole.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (minimum 6 characters)',
    required: false,
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'CUSTOMER',
    enum: UserRole,
    description: 'User role (Admin, Customer, Seller)',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'User must be a customer, seller, admin or superadmin',
  })
  role?: UserRole;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is verified',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({
    example: '1234567890',
    description: 'Google ID if signed in with Google',
    required: false,
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  // Additional fields for sellers
  @ApiProperty({
    example: "John's Store",
    description: 'Store name (if user is a seller)',
    required: false,
  })
  @IsOptional()
  @IsString()
  storeName?: string;

  @ApiProperty({
    example: 'We sell quality electronics.',
    description: 'Store description',
    required: false,
  })
  @IsOptional()
  @IsString()
  storeDescription?: string;

  @ApiProperty({
    example: '1234 Main Street, NY',
    description: 'Store address',
    required: false,
  })
  @IsOptional()
  @IsString()
  storeAddress?: string;

  @ApiProperty({
    example: '+1 234 567 890',
    description: 'User phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
