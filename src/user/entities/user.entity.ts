import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';
import { UserRole } from '../enum/userRole.enum';
import { Review } from 'src/review/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
    required: false,
  })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'hashedpassword123',
    description: 'User password (hashed)',
    required: true,
  })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @ApiProperty({
    example: 'CUSTOMER',
    enum: UserRole,
    description: 'User role (Admin, Customer, Seller)',
  })
  role: UserRole;

  @Column({ type: 'boolean', default: true, nullable: false })
  @ApiProperty({
    example: true,
    description: 'Indicates if the user is verified',
  })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: '1234567890',
    description: 'Google ID if signed in with Google',
    required: false,
  })
  googleId?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: "John's Store",
    description: 'Store name (if user is a seller)',
    required: false,
  })
  storeName?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: 'We sell quality electronics.',
    description: 'Store description',
    required: false,
  })
  storeDescription?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: '1234 Main Street, NY',
    description: 'Store address',
    required: false,
  })
  storeAddress?: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    example: '+1 234 567 890',
    description: 'User phone number',
    required: false,
  })
  phoneNumber?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-02-20T12:00:00Z',
    description: 'Timestamp when the user was created',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2024-02-21T12:00:00Z',
    description: 'Timestamp when the user was last updated',
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.seller)
  @ApiProperty({
    type: () => [Product],
    description: 'List of products owned by the user',
    required: false,
  })
  products: Product[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @ApiProperty({
    type: () => [Cart],
    description: 'List of carts associated with the user',
    required: false,
  })
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    type: () => [Order],
    description: 'List of orders made by the user',
    required: false,
  })
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  @ApiProperty({
    type: () => [Review],
    description: 'List of reviews made by the user',
    required: false,
  })
  reviews: Review[];
}
