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
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
import { UserRole } from './enum/userRole.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paginationService: PaginationProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) { }
  public async create(createUserDto: CreateUserDto) {

    // 1. check for existing admin
    const existingAdmin = await this.userRepository.findOne({
      where: { email: createUserDto.email, role: UserRole.ADMIN },
    });
    if (existingAdmin) {
      throw new NotFoundException('Admin already exists');
    }

    // 2. set role as admin
    createUserDto.role = UserRole.ADMIN;

    // 3. set default password
    const hashedPassword = await bcrypt.hash('1234password', 10);
    createUserDto.password = hashedPassword;    // encrypt password

    // 4 set isVerified as false
    createUserDto.isVerified = false;

    // 5. create the user
    const newUser = this.userRepository.create(createUserDto);

    // 6. send admin email verification (if mail service is available)
    // await this.emailService.sendAdminVerificationEmail(newUser);

    // 7. save the user
    return await this.userRepository.save(newUser);
  }
  
  public async findAllAdmins() {
    const admins = await this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });

    // Exclude sensitive information
    const adminsWithoutSensitiveData = admins.map(admin => {
      const { password, googleId, storeName, storeDescription, storeAddress, ...adminWithoutSensitiveData } = admin;
      return adminWithoutSensitiveData;
    });

    return { admins: adminsWithoutSensitiveData };
  }

  public async findAdminByEmail(email: string) {
    const admin = await this.userRepository.findOne({
      where: { email, role: UserRole.ADMIN },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    // exclude sensitive information
    const { password, googleId, storeName, storeDescription, storeAddress, ...result } = admin;
    return result;
  }

  public async findAllSellers() {
    const sellers = await this.userRepository.find({
      where: { role: UserRole.SELLER },
      relations: ['products', 'products.seller'],
    });

    // Exclude sensitive information
    const sellersWithoutSensitiveData = sellers.map(admin => {
      const { password, googleId, ...sellerWithoutSensitiveData } = admin;
      return sellerWithoutSensitiveData;
    });

    return { sellers: sellersWithoutSensitiveData };
  }

  public async findSellerByEmail(email: string) {
    const seller = await this.userRepository.findOne({
      where: { email, role: UserRole.SELLER },
      relations: ['products', 'products.seller'],
    });

    if (!seller) {
      throw new NotFoundException(`Seller with email ${email} not found`);
    }
    // exclude sensitive information
    const { password, googleId, ...result } = seller;
    return result;
  }

  // public async findAllCustomers() {
  //   return await this.userRepository.find({
  //     where: { role: UserRole.CUSTOMER },
  //   });
  // }

  public async findOneById(id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException(`Invalid user ID: ${id}`);
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    // remove sensitive information if any
    return user;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }

  // public async FindAllPosts(postQuery: GetUsersDto): Promise<paginated<User>> {
  //   const product = await this.paginationService.paginationQuery(
  //     {
  //       limit: postQuery.limit,
  //       page: postQuery.page,
  //     },
  //     this.userRepository,
  //   );
  //   return product;
  // }
}
