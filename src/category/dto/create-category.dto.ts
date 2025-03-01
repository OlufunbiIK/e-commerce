import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../enum/productCategory.enum';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    enum: ProductCategory,
    example: ProductCategory.ELECTRONICS, // Replace with a valid category from your enum
  })
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  name: ProductCategory;
}
