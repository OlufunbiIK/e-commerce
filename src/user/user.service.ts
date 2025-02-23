/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUsersDto } from './dto/get-users-dto.dto';
import { paginated } from 'src/common/pagination/interfaces/pagination-interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paginationService: PaginationProvider,
  ) {}
  public async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  public async FindAllPosts(postQuery: GetUsersDto): Promise<paginated<User>> {
    const product = await this.paginationService.paginationQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.userRepository,
    );
    return product;
  }

   public async findOneById(id: string) {
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
        throw new NotFoundException(`Invalid user ID: ${id}`);
      }
  
      const user = await this.userRepository.findOne({
        where: { id: userId },
        // relations: ['products', 'products.user'],  //maybe orders
      });
  
      if (!user) {
        throw new NotFoundException(`user with id ${id} not found`);
      }
  
      return user;
    }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
