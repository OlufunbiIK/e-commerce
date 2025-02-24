import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([User])],    //needs modules - products, orders, categories,
  controllers: [UserController],
  providers: [UserService, PaginationProvider, FindOneByEmailProvider],
  exports: [UserService, TypeOrmModule, FindOneByEmailProvider],
})
export class UserModule {}
