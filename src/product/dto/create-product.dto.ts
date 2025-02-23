/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
  
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  stock: number;
  
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @IsString()
  @IsOptional()
  productUrl?: string;
}
