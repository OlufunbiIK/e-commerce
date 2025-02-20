/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/Pagination.service';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
