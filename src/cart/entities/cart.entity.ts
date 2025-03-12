import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CartStatus } from '../enum/cartStatus.enum';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty({
    description: 'Unique identifier of the cart',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User who owns this cart',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({
    description: 'Total quantity of products in the cart',
    example: 3,
  })
  @Column({ type: 'integer' })
  quantity: number;

  @ApiProperty({
    description: 'Status of the cart',
    enum: CartStatus,
    example: CartStatus.ACTIVE,
  })
  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
  status: CartStatus;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true,
  })
  @ApiProperty({
    description: 'List of cart items',
    type: () => [CartItem],
  })
  cartItems: CartItem[];

  @ApiProperty({
    description: 'Total price of items in the cart',
    example: 150.5,
  })
  @Column({ default: 0, type: 'float' })
  totalPrice: number;
}
