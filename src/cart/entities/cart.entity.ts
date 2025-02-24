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

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  //step3 - many carts to a single user
  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
  status: CartStatus;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true,
  })
  cartItems: CartItem[];

  @Column({ default: 0 })
  totalPrice: number;
}
