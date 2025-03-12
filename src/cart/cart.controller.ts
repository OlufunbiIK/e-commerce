import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cart') // Organizes API under 'Cart' in Swagger
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({
    summary: 'Add an item to the cart',
    description: 'Adds a product to the user’s cart with the specified quantity.',
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
  @ApiResponse({
    status: 201,
    description: 'Item successfully added to cart',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async addToCart(@Body() body: AddToCartDto) {
    try {
      return await this.cartService.addToCart(body.userId, body.productId, body.quantity);
    } catch (error) {
      throw error;
    }
  }

  @Get(':userId')
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
  @ApiResponse({
    status: 200,
    description: 'Cart retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Cart not found',
  })
  async getCart(@Param('userId') userId: number) {
    try {
      return await this.cartService.getCart(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('cart-items')
  @ApiOperation({
    summary: 'Get all cart items',
    description: 'Retrieves all cart items from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all cart items retrieved successfully',
  })
  async getAllCartItems(): Promise<CartItem[]> {
    return this.cartService.getAllCartItems();
  }

  @Get('items/:userId')
  @ApiOperation({
    summary: 'Get cart items for a user',
    description: 'Retrieves all cart items for a specific user by user ID.',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    example: 1,
    description: 'ID of the user whose cart items are being fetched',
  })
  @ApiResponse({
    status: 200,
    description: 'Cart items retrieved successfully',
  })
  async getCartItemsByUser(@Param('userId') userId: number): Promise<CartItem[]> {
    return this.cartService.getCartItemsByUser(userId);
  }

  @Delete('remove')
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
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found in cart',
  })
  removeFromCart(@Body() body: { userId: number; productId: number }) {
    return this.cartService.removeFromCart(body.userId, body.productId);
  }
}
