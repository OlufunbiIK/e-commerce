import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CartStatus } from '../enum/cartStatus.enum';
import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';

export class CreateCartDto {
  @ApiProperty({
    description: 'Unique identifier of the cart',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID of the product being added to the cart',
    example: 101,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'User who owns the cart',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ApiProperty({
    description: 'Quantity of the product in the cart',
    example: 2,
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Status of the cart (active, checked_out, abandoned)',
    enum: CartStatus,
    example: CartStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(CartStatus, {
    message: 'Status must be active, checked_out, or abandoned',
  })
  status?: CartStatus;
}
