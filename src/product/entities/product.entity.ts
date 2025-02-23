import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
  })
  title: string;
  
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
  })
  price: number;
  
  @Column()
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  productUrl?: string;

  @CreateDateColumn(
    {
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    },
  )
  createdAt: Date;

  @UpdateDateColumn(
    {
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    },
  )
  updatedAt: Date;

  // relations
  // 1. category
  // 2. seller
  // 3. reviews
  // 4. order
  // 5. orderItems
  // 6. maybe cart ???

  // eager - category, seller, reviews, 

  @ManyToOne(
    () => Category,
    { eager: true },
  )
  @JoinColumn()
  category: number;

  @ManyToOne(
    () => User,
    (user) => user.products,
    {
      eager: true,
      onDelete: 'CASCADE'
    },
  )
  seller: number;

  // @ManyToMany(
  //   () => Tag,
  //   (tag) => tag.stories,
  //   { eager: true },
  // )
  // tags?: Review[];

  // fixme - don't need this here. in orderItem it should point to product id
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
