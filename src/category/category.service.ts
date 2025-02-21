/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from './enum/productCategory.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  public async create(createCategoryDto: CreateCategoryDto) {
    // Validate and convert categoryName to ProductCategory type
    if (!Object.values(ProductCategory).includes(createCategoryDto.name as ProductCategory)) {
      throw new BadRequestException(`Invalid category name: ${createCategoryDto.name}`);
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  public async findAll() {
    const result = await this.categoryRepository.find();
    return result;
  }

  public async findOne(categoryName: string) {

    const category = await this.categoryRepository.findOne({
      where: { name: categoryName as ProductCategory },
      relations: ['products', 'products.category'], 
    });

    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found.`);
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
