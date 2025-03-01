import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemsDto {
  @ApiProperty({
    description: 'The cart to which the item belongs',
    type: () => Cart,
  })
  @IsNotEmpty()
  @IsString()
  cart: Cart;

  @ApiProperty({
    description: 'The product being added to the cart',
    type: () => Product,
  })
  @IsNotEmpty()
  @IsString()
  product: Product;

  @ApiProperty({
    description: 'The quantity of the product in the cart',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'The price of the product at the time of adding to the cart',
    example: 19.99,
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;
}
