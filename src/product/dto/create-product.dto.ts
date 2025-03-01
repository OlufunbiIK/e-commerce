import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Title of the product',
    example: 'Smartphone X10',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'A high-end smartphone with 128GB storage and 12GB RAM.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 299.99,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Available stock quantity',
    example: 50,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description: 'ID of the seller',
    example: 'seller_12345',
  })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({
    description: 'Optional product image URL',
    example: 'https://example.com/product-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  productUrl?: string;
}
