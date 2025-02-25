import { CanActivate, ExecutionContext, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productService: ProductService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const productId = request.params.id;

    const product = await this.productService.findOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (product.seller.id !== user.id) {
      throw new ForbiddenException('You do not have permission to manage this product');
    }

    return true;
  }
}