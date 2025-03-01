import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InitializePaymentDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user making the payment',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 5000,
    description: 'Amount to be paid (in kobo for NGN currency)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
