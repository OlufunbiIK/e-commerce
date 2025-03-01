import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Payment {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier for the payment',
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: 'ref_123456789',
    description: 'Unique payment reference from Paystack',
    uniqueItems: true,
  })
  @Column({ unique: true })
  reference: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user making the payment',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 5000.0,
    description: 'Amount paid (in Naira, stored as decimal)',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the payment (pending, success, failed)',
    default: 'pending',
  })
  @Column({ default: 'pending' })
  status: string;

  @ApiProperty({
    example: '2024-03-01T12:00:00.000Z',
    description: 'Timestamp when the payment was created',
  })
  @CreateDateColumn()
  createdAt: Date;
}
