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

  public async findOneById(id: string) {
    const categoryId = parseInt(id, 10);
    if (isNaN(categoryId)) {
      throw new NotFoundException(`Invalid category ID: ${id}`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  public async findOneByName(categoryName: string) {

    const category = await this.categoryRepository.findOne({
      where: { name: categoryName as ProductCategory },
      relations: ['products', 'products.category'],
    });

    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found.`);
    }

    // Exclude seller information from products in category response
    const productsWithoutSeller = category.products.map(product => {
      const { seller, ...productWithoutSeller } = product;
      return productWithoutSeller;
    });

    return { ...category, products: productsWithoutSeller };
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  public async remove(category: string) {
    // 1. check if category exists
    const categoryExists = this.categoryRepository.findOne({
      where: { name: category as ProductCategory },
    });

    if (!categoryExists) {
      throw new NotFoundException(`Category with name ${category} not found.`);
    }

    // 2. check if category has products, if yes, return error message
    const categoryWithProducts = await this.categoryRepository.findOne({
      where: { name: category as ProductCategory },
      relations: ['products'],
    });

    if (categoryWithProducts.products.length > 0) {
      throw new BadRequestException(`Category ${category} cannot be deleted as it has products.`);
    }

    // 3. if no products, delete category
    await this.categoryRepository.delete({ name: category as ProductCategory });

    // 4. if products, return error message
    return `Category ${category} has been deleted successfully.`;

  }
}
