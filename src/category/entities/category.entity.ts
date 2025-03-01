import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../enum/productCategory.enum';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Category {
  @ApiProperty({
    description: 'Unique identifier for the category',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The category name',
    enum: ProductCategory,
    example: ProductCategory.ELECTRONICS, // Replace with a valid enum value
  })
  @Column({
    type: 'enum',
    enum: ProductCategory,
    unique: true,
    nullable: false,
  })
  name: ProductCategory;

  @ApiProperty({
    description: 'Timestamp when the category was created',
    example: '2024-03-01T12:34:56.789Z',
  })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the category was last updated',
    example: '2024-03-02T15:22:30.123Z',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'List of products associated with this category',
    type: () => [Product], // Swagger will recognize this as an array of Product entities
  })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
