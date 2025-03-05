import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Category } from 'src/category/entities/category.entity';
import { Review } from 'src/review/entities/review.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';

@Entity()
export class Product {
  @ApiProperty({ description: 'Unique identifier for the product' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the product',
    example: 'Smartphone XYZ',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'Untitled Product',
    length: 150,
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'This is a high-end smartphone.',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({ description: 'Price of the product', example: 499.99 })
  @Column({
    type: 'decimal',
  })
  price: number;

  @ApiProperty({
    description: 'Number of items available in stock',
    example: 100,
  })
  @Column()
  stock: number;

  @ApiProperty({
    description: 'URL of the product',
    example: 'https://example.com/product-xyz',
    required: false,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  productUrl?: string;

  @ApiProperty({ description: 'Timestamp when the product was created' })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the product was last updated' })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Category of the product' })
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  category: number;

  @ApiProperty({ description: 'Seller of the product' })
  @ManyToOne(() => User, (user) => user.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  seller: number;

  @ApiProperty({
    description: 'Order items associated with this product',
    type: [OrderItem],
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ApiProperty({ description: 'Reviews of the product', type: [Review] })
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ApiProperty({
    description: 'Cart items associated with the product',
    type: [CartItem],
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { eager: true })
  cartItems: CartItem[];
}
