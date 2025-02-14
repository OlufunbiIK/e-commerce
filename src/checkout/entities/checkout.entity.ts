import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { PaymentStatus } from '../enum/paymentStatus.enum';
import { CheckoutStatus } from '../enum/checkoutStatus.enum';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  paymentMethod: string;

  @Column()
  totalAmount: number;

  @Column({ default: 'pending' })
  paymentStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: CheckoutStatus, default: CheckoutStatus.UNSET })
  checkoutStatus: CheckoutStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INITIATED,
  })
  PaymentStatus: PaymentStatus;
}
