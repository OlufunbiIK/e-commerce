import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Add an item to the cart',
    description:
      'Adds a product to the user’s cart with the specified quantity.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          example: 1,
          description: 'ID of the user adding the product to the cart',
        },
        productId: {
          type: 'number',
          example: 101,
          description: 'ID of the product to be added',
        },
        quantity: {
          type: 'number',
          example: 2,
          description: 'Quantity of the product to be added',
        },
      },
    },
  })
  @Post('add')
  addToCart(@Body() body) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity,
    );
  }
}
