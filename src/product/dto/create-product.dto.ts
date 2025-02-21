import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsInt,
  IsEnum,
  IsOptional,
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
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductCategory, {
    message: 'Category must be of type of ProductCategory enum',
  })
  category: ProductCategory;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  stock: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  sellerId: number;

  @IsString()
  @IsOptional()
  productUrl?: string;
}
