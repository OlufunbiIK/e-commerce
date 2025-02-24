/* eslint-disable @typescript-eslint/no-require-imports */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from './entities/product.entity';
// import { Repository } from 'typeorm';
// import { PaginationProvider } from 'src/common/pagination/provider/pagination.service';
// import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
// import { GetProductsDto } from './dto/get-products.dto';
// import { CategoryService } from 'src/category/category.service';
// import { UserService } from 'src/user/user.service';
// import slugify from 'slugify';
// import { customAlphabet } from 'nanoid';

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//     private readonly paginationService: PaginationProvider,
//     private readonly categoryService: CategoryService,
//     private readonly userService: UserService,
//   ) {}

//   public async create(createProductDto: CreateProductDto) {
//     // 1. check if category exist, then get the category reference, else throw an error
//     const category = await this.categoryService.findOne(
//       createProductDto.category,
//     );

//     if (category) {
//       createProductDto.category = category.name;
//     } else {
//       throw new NotFoundException(
//         `category with name ${createProductDto.category} not found.`,
//       );
//     }

//     // todo - halting this until user module is implemented
//     // 2. check if the sellerId exist, then get the seller reference, else throw an error
//     // const seller = await this.userService.findOne(createProductDto.sellerId);

//     // if (seller) {
//     //   createProductDto.sellerId = seller.id;
//     // } else {
//     //   throw new NotFoundException(`seller with id ${createProductDto.sellerId} not found.`);
//     // }

//     // 3. slugify the title
//     const slugTitle = slugify(createProductDto.title, {
//       replacement: '-',
//       lower: true,
//       remove: /[*+~.()'"!:@]/g,
//       strict: true,
//     });

//     // 4. generate a unique productUrl
//     const nanoid = customAlphabet('1234567890', 10);
//     let productUrl;
//     let isUnique = false;

//     while (!isUnique) {
//       const generatedId = nanoid();
//       productUrl = `${slugTitle}-${generatedId}`;
//       const existingProductWithUrl = await this.productRepository.findOne({
//         where: { productUrl },
//       });
//       if (!existingProductWithUrl) {
//         isUnique = true;
//       }
//     }

//     // 5. create the product
//     const newProduct = this.productRepository.create({
//       ...createProductDto,
//       category: category.name,
//       // sellerId: user.id,
//       productUrl,
//     });
//     return this.productRepository.save(newProduct);
//   }

//   public async getAllProducts(
//     postQuery: GetProductsDto,
//   ): Promise<paginated<Product>> {
//     const product = await this.paginationService.paginationQuery(
//       {
//         limit: postQuery.limit,
//         page: postQuery.page,
//       },
//       this.productRepository,
//     );
//     return product;
//   }
//   public async FindAllPosts(
//     postQuery: GetProductsDto,
//   ): Promise<paginated<Product>> {
//     const product = await this.paginationService.paginationQuery(
//       {
//         limit: postQuery.limit,
//         page: postQuery.page,
//       },
//       this.productRepository,
//     );
//     return product;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} product`;
//   }

//   update(id: number, updateProductDto: UpdateProductDto) {
//     return `This action updates a #${id} product`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} product`;
//   }
// }

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
import { UserService } from 'src/user/user.service';

// ✅ Fix: Correct import for nanoid
import * as slugify from 'slugify';
const slugifyFn = slugify.default || slugify;

import { customAlphabet } from 'nanoid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService: PaginationProvider,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.category,
    );

    if (!category) {
      throw new NotFoundException(
        `Category with name ${createProductDto.category} not found.`,
      );
    }

    createProductDto.category = category.name;

    const slugTitle = slugify.default(createProductDto.title, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });

    const { customAlphabet } = await import('nanoid');
    const nanoid = customAlphabet('1234567890', 10);

    let productUrl;
    let isUnique = false;

    while (!isUnique) {
      const generatedId = nanoid();
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
      category: category.name,
      productUrl,
    });

    return this.productRepository.save(newProduct);
  }

  public async getAllProducts(
    postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    return this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.productRepository,
    );
  }

  public async FindAllPosts(
    postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    return this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.productRepository,
    );
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
