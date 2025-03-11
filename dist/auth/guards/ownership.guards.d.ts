import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from 'src/product/product.service';
export declare class OwnershipGuard implements CanActivate {
    private readonly reflector;
    private readonly productService;
    constructor(reflector: Reflector, productService: ProductService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
