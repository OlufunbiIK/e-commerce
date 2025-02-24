import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    category: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    stock: number;
}
