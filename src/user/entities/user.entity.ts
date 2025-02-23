import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';
import { UserRole } from '../enum/userRole.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column({ type: 'boolean', default: true, nullable: false })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  googleId?: string;

  @Column({ type: 'varchar', nullable: true })
  storeName?: string;

  @Column({ type: 'varchar', nullable: true })
  storeDescription?: string;

  @Column({ type: 'varchar', nullable: true })
  storeAddress?: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

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

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
