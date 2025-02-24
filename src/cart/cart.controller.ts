import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() body) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity,
    );
  }
}
