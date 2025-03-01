/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Category') // Groups all endpoints under 'Category' in Swagger
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only SUPERADMIN can create categories.',
  })
  @Roles(UserRole.SUPERADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories.' })
  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, description: 'Category found.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the category',
    example: '1',
  })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  // Uncomment if needed
  // @ApiOperation({ summary: 'Update a category' })
  // @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  // @ApiResponse({ status: 403, description: 'Forbidden: Only SUPERADMIN can update categories.' })
  // @ApiParam({ name: 'id', description: 'Unique identifier of the category', example: '1' })
  // @Roles(UserRole.SUPERADMIN)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only SUPERADMIN can delete categories.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the category',
    example: '1',
  })
  @Roles(UserRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
