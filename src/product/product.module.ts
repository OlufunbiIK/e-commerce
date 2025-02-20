import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, PaginationProvider],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
