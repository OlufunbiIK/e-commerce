/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

// ✅ Correct slugify import
import { default as slugify } from 'slugify';
// import { customAlphabet } from 'nanoid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService: PaginationProvider,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOneById(
      createProductDto.category,
    );

    if (category) {
      createProductDto.category = category.id.toString();
    } else {
      throw new NotFoundException(
        `category with name ${createProductDto.category} not found.`,
      );
    }

    const seller = await this.userService.findOneById(
      createProductDto.sellerId,
    );

    if (seller) {
      createProductDto.sellerId = seller.id.toString();
    } else {
      throw new NotFoundException(
        `seller with id ${createProductDto.sellerId} not found.`,
      );
    }

    const slugTitle = slugify(createProductDto.title, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });

    // Replace nanoid with uuid

    let productUrl: string;
    let isUnique = false;

    while (!isUnique) {
      // Generate a numeric-like string from UUID
      // This takes the first 10 characters of a UUID (removing hyphens) which will typically be hexadecimal
      const generatedId = uuidv4().replace(/-/g, '').substring(0, 10);
      productUrl = `${slugTitle}-${generatedId}`;
      const existingProductWithUrl = await this.productRepository.findOne({
        where: { productUrl },
      });

      if (!existingProductWithUrl) {
        isUnique = true;
      }
    }

    const newProduct = this.productRepository.create({
      ...createProductDto,
      category: category.id,
      seller: seller.id,
      productUrl,
    });

    return this.productRepository.save(newProduct);
  }

  public async getAllProducts(
    productQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    // Create a cache key based on pagination parameters
    const cacheKey = `all_products:page:${productQuery.page}:limit:${productQuery.limit}`;

    // Try to get the cached data
    const cachedData =
      await this.cacheManager.get<paginated<Product>>(cacheKey);
    console.log('Cache content:', cachedData);

    if (cachedData) {
      console.log('Returning products from cache');
      return cachedData;
    }

    // Clear cache manually before fetching new data
    await this.cacheManager.del(cacheKey);
    console.log('Cache cleared');

    // Get products from DB via pagination service
    const paginatedResult = await this.paginationService.paginationQuery(
      {
        limit: productQuery.limit,
        page: productQuery.page,
      },
      this.productRepository,
    );

    // Remove sensitive seller data
    const productsWithoutSensitiveSellerData = paginatedResult.data.map(
      (product) => {
        const { seller, ...productDetails } = product;
        let sellerWithoutSensitiveInfo;
        if (typeof seller === 'object' && seller !== null) {
          const { password, googleId, role, ...rest } = seller as Record<
            string,
            any
          >;
          sellerWithoutSensitiveInfo = rest;
        }

        return {
          ...productDetails,
          seller: sellerWithoutSensitiveInfo,
        };
      },
    );

    const result = {
      ...paginatedResult,
      data: productsWithoutSensitiveSellerData,
    };

    // Cache the result for future requests (for example, cache for 60 seconds)
    await this.cacheManager.set(cacheKey, result);
    return result;
  }

  public async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'seller'], // also reviews
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const { seller, ...productDetails } = product;
    let sellerWithoutSensitiveInfo;
    if (typeof seller === 'object' && seller !== null) {
      const { password, googleId, role, ...rest } = seller as Record<
        string,
        any
      >;
      sellerWithoutSensitiveInfo = rest;
    }

    return {
      ...productDetails,
      seller: sellerWithoutSensitiveInfo,
    };
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    // 1. Check if the product exists
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const updatedProduct = Object.assign(product, updateProductDto);

    const { seller, ...result } = updatedProduct;
    return result;
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
