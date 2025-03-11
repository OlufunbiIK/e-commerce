import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { OrderStatus } from '../enum/orderStatus.enum';

@Entity()
export class Order {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User who placed the order',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty({
    description: 'List of items in the order',
    type: () => [OrderItem], // Array of OrderItem objects
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @ApiProperty({
    description: 'Total price of the order',
    example: 299.99,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @ApiProperty({
    description: 'Current status of the order',

    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ApiProperty({
    description: 'Timestamp when the order was created',
    example: '2024-03-01T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the order was last updated',
    example: '2024-03-02T14:45:30.123Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
