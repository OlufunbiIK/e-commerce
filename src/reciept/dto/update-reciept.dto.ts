import { PartialType } from '@nestjs/swagger';
import { CreateRecieptDto } from './create-reciept.dto';

export class UpdateRecieptDto extends PartialType(CreateRecieptDto) {}
