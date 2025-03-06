import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  Check,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Check(`rating >= 1 AND rating <= 5`) // Ensures rating is between 1-5
export class Review {
  @ApiProperty({ description: 'Unique identifier for the review', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Review comment', example: 'Great product!' })
  @Column({ type: 'text', nullable: false })
  comment: string;

  @ApiProperty({
    description: 'Rating given by the user (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @Column({ type: 'int', default: 1, nullable: false })
  rating: number;

  @ApiProperty({
    description: 'User who wrote the review',
    type: () => User,
    nullable: true,
  })
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'SET NULL', // Keeps review data even if user is deleted
    nullable: true,
  })
  @Index() // Improves query performance
  user: User;

  @ApiProperty({
    description: 'Product that was reviewed',
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE', // If product is deleted, remove reviews
  })
  @Index()
  product: Product;

  @ApiProperty({
    description: 'Timestamp when the review was created',
    example: '2024-03-06T12:34:56.789Z',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
