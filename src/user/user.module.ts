import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, FindOneByEmailProvider],
  exports: [UserService, FindOneByEmailProvider, TypeOrmModule],
})
export class UserModule {}
