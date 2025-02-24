/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.service';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { GetProductsDto } from './dto/get-products.dto';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import slugify from 'slugify';
import { customAlphabet } from 'nanoid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService: PaginationProvider,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) { }

  public async create(createProductDto: CreateProductDto) {

    // 1. check if category exist, then get the category reference, else throw an error
    const category = await this.categoryService.findOneById(createProductDto.category);

    if (category) {
      createProductDto.category = category.id.toString();
    } else {
      throw new NotFoundException(`category with name ${createProductDto.category} not found.`);
    }

    // 2. check if the sellerId exist, then get the seller reference, else throw an error
    const seller = await this.userService.findOneById(createProductDto.sellerId);

    if (seller) {
      createProductDto.sellerId = seller.id.toString();
    } else {
      throw new NotFoundException(`seller with id ${createProductDto.sellerId} not found.`);
    }

    // 3. slugify the title
    const slugTitle = slugify(createProductDto.title, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });

    // 4. generate a unique productUrl
    const nanoid = customAlphabet('1234567890', 10);
    let productUrl: string;
    let isUnique = false;

    while (!isUnique) {
      const generatedId = nanoid();
      productUrl = `${slugTitle}-${generatedId}`;
      const existingProductWithUrl = await this.productRepository.findOne({ where: { productUrl } });
      if (!existingProductWithUrl) {
        isUnique = true;
      }
    }

    // 5. create the product
    const newProduct = this.productRepository.create({
      ...createProductDto,
      category: category.id,
      seller: seller.id,
      productUrl,
    });
    return this.productRepository.save(newProduct);
  }

  public async getAllProducts(
    postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    const paginatedResult = await this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.productRepository,
    );

    // Exclude sensitive data from the seller in each product
    const productsWithoutSensitiveSellerData = paginatedResult.data.map(product => {
      const { seller, ...productDetails } = product;
      let sellerWithoutSensitiveInfo;
      if (typeof seller === 'object' && seller !== null) {
        const { password, googleId, role, ...rest } = seller as Record<string, any>;
        sellerWithoutSensitiveInfo = rest;
      }

      return {
        ...productDetails,
        seller: sellerWithoutSensitiveInfo,
      };
    });

    return {
      ...paginatedResult,
      data: productsWithoutSensitiveSellerData,
    };
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

  public async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'seller'],    // also reviews
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const { seller, ...productDetails } = product;
    let sellerWithoutSensitiveInfo;
    if (typeof seller === 'object' && seller !== null) {
      const { password, googleId, role, ...rest } = seller as Record<string, any>;
      sellerWithoutSensitiveInfo = rest;
    }

    return {
      ...productDetails,
      seller: sellerWithoutSensitiveInfo,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public async remove(id: number) {
    // 1. check if product exists
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // 2. Check if the product has orders
    // if (product.orders && product.orders.length > 0) {
    //   throw new BadRequestException(`Product with id ${id} has orders and cannot be deleted`);
    // }

    // 3. Delete the product
    await this.productRepository.remove(product);

    // 5. Return success message
    return { message: `Product with id ${id} has been successfully deleted` };
  }
}
