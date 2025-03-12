import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderItemStatus } from '../enum/orderItemStatus.enum';

@Entity()
export class OrderItem {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the order item',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The order associated with this order item',
    type: () => Order, // Reference to the Order entity
  })
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ApiProperty({
    description: 'The product associated with this order item',
    type: () => Product, // Reference to the Product entity
  })
  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty({
    example: 3,
    description: 'Quantity of the product in the order',
  })
  @Column()
  quantity: number;

  @ApiProperty({
    example: 'in_stock',
    description: 'The status of the order item',
    enum: OrderItemStatus,
    default: OrderItemStatus.IN_STOCK,
  })
  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.IN_STOCK,
  })
  status: OrderItemStatus;

  @Column({
    type: 'decimal', // ✅ Ensures it's stored as a decimal
    precision: 10, // ✅ Total digits (e.g., 1234567890.99)
    scale: 2, // ✅ Decimal places (e.g., 1500.75)
    transformer: {
      to: (value: number) => value.toFixed(2), // ✅ Ensure correct format before saving
      from: (value: string) => parseFloat(value), // ✅ Convert string to number
    },
  })
  price: number;
}
