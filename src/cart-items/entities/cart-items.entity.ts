import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem {
  @ApiProperty({
    description: 'Unique identifier of the cart item',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The cart to which this item belongs',
    type: () => Cart,
  })
  @ManyToOne(() => Cart, (carts) => carts.cartItems, { onDelete: 'CASCADE' })
  cart: Cart;

  @ApiProperty({
    description: 'The product associated with this cart item',
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ApiProperty({
    description: 'Quantity of the product in the cart',
    example: 2,
  })
  @Column({ type: 'integer' })
  quantity: number;

  @ApiProperty({
    description: 'Price of the product at the time of adding to the cart',
    example: 19.99,
  })
  @Column({ type: 'float' })
  price: number;
}
