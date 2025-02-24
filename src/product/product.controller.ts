import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { Product } from './entities/product.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles(UserRole.SELLER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  async getAllProducts(
    @Query() postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    return await this.productService.getAllProducts(postQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Roles(UserRole.SELLER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(UserRole.SELLER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
