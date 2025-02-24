import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
