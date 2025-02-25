import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './enum/userRole.enum';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) {}

  // this is for creating admins, customers and sellers are created through the auth controller - register
  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('admins')
  findAllAdmins() {
    return this.userService.findAllAdmins();
  }

  @Roles(UserRole.SUPERADMIN) // can be omitted if sellers can be seen by customers, and add the Public decorator
  @Get('sellers')
  findAllSellers() {
    return this.userService.findAllSellers();
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('admin/:email')
  findAdminByEmail(@Param('email') email: string) {
    return this.userService.findAdminByEmail(email);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('seller/:email')
  findSellerByEmail(@Param('email') email: string) {
    return this.userService.findSellerByEmail(email);
  }

  // for user to see their own profile, they should use the auth/profile endpoint
  @Roles(UserRole.SUPERADMIN)
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.findOneByEmailProvider.findOneByEmail(email);
  }

  @Roles(UserRole.SUPERADMIN)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }

  // // 🔒 Admin Only: Get All Users
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  // @Get()
  // public getAllPosts(@Query() getProductsDto: GetUsersDto) {
  //   // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getPostParamDto: GetPostParamDto,
  //   return this.userService.FindAllPosts(getProductsDto);
  // }
}
