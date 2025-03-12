import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';

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
  async addToCart(@Body() body: AddToCartDto) {
    try {
      return await this.cartService.addToCart(
        body.userId,
        body.productId,
        body.quantity,
      );
    } catch (error) {
      throw error; // Re-throw any errors that may occur in the service
    }
  }

  @ApiOperation({
    summary: 'Get the user’s cart',
    description: 'Retrieves the user’s cart based on the user ID.',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    example: 1,
    description: 'ID of the user whose cart is being fetched',
  })
  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    try {
      return await this.cartService.getCart(userId);
    } catch (error) {
      throw error; // Handle errors (e.g., cart not found, etc.)
    }
  }

  @ApiOperation({
    summary: 'Get all cart items',
    description: 'Retrieves all cart items from the database.',
  })
  @Get('cart-items')
  async getAllCartItems(): Promise<CartItem[]> {
    return this.cartService.getAllCartItems();
  }

  @Get('items/:userId')
  async getCartItemsByUser(
    @Param('userId') userId: number,
  ): Promise<CartItem[]> {
    return this.cartService.getCartItemsByUser(userId);
  }
}
