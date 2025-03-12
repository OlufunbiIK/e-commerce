import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { Product } from './entities/product.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';
import { OwnershipGuard } from 'src/auth/guards/ownership.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Products') // Groups endpoints under "Products" in Swagger UI
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiBearerAuth() // Requires authentication token
  @Roles(UserRole.SELLER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Retrieve all products with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  @Public()
  @Get()
  async getAllProducts(
    @Query() postQuery: GetProductsDto,
  ): Promise<paginated<Product>> {
    return await this.productService.getAllProducts(postQuery);
  }

  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({ status: 200, description: 'Product details', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized to update this product',
  })
  @ApiBearerAuth()
  @Roles(UserRole.SELLER)
  @Patch(':id')
  @UseGuards(OwnershipGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Get('by-url/:productUrl')
  @Public()
  @ApiOperation({ summary: 'Find a product by its URL' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findByProductUrl(@Param('productUrl') encodedUrl: string) {
    const productUrl = decodeURIComponent(encodedUrl); // Decode the URL
    return this.productService.getProductByProductUrl(productUrl);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized to delete this product',
  })
  @ApiBearerAuth() // Requires authentication token
  @Roles(UserRole.SELLER)
  @Delete(':id')
  @UseGuards(OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
