/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaginationProvider } from './provider/pagination.service';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
