/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsInt,
  IsEnum,
} from 'class-validator';
import { ProductCategory } from '../../category/enum/productCategory.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductCategory, {
    message:
      'Category must be electronics, fashion, home_appliances, books, sports, toys, or beauty',
  })
  category: ProductCategory;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  @IsPositive()
  sellerId: number;
}
