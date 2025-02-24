import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CartStatus } from '../enum/cartStatus.enum';
import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';

export class CreateCartDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  productId: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @IsNumber()
  quantity: number;

  @IsOptional() // Optional field (default will be set in the entity)
  @IsEnum(CartStatus, {
    message: 'Status must be active, checked_out, or abandoned',
  })
  status?: CartStatus;
}
