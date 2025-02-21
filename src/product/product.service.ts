/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.service';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { GetProductsDto } from './dto/get-products.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService: PaginationProvider,
    private readonly categoryService: CategoryService,
  ) { }

  public async create(createProductDto: CreateProductDto) {
    // 1. check if category exist, then get the category reference, else throw an error
    const category = await this.categoryService.findOne(createProductDto.category);

    // if (category) {
    //   createProductDto.category = category;
    // } else {
    //   throw new NotFoundException(`category with name ${createProductDto.category} not found.`);
    // }

    // 2. check if the sellerId exist, then get the seller reference, else throw an error
    // 3. create the product
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  public async getAllProducts(
    postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    const product = await this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.productRepository,
    );
    return product;
  }
  public async FindAllPosts(
    postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    const product = await this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.productRepository,
    );
    return product;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
