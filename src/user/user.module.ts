import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PaginationProvider],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
