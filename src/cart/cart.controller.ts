import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('carts')
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
    return this.cartService.addToCart(body.userId, body.productId, body.quantity);
  }

  @ApiOperation({
    summary: 'Get user cart',
    description: 'Retrieves the cart for a specific user.',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    example: 1,
    description: 'ID of the user whose cart is being retrieved',
  })
  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @ApiOperation({
    summary: 'Remove an item from the cart',
    description: 'Removes a specific product from the user’s cart.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          example: 1,
          description: 'ID of the user',
        },
        productId: {
          type: 'number',
          example: 101,
          description: 'ID of the product to remove',
        },
      },
    },
  })
  @Delete('remove')
  removeFromCart(@Body() body) {
    return this.cartService.removeFromCart(body.userId, body.productId);
  }
}
