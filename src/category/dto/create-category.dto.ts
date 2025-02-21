/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductCategory } from '../enum/productCategory.enum';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  name: ProductCategory;
}
