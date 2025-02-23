/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './enum/userRole.enum';
import { GetUsersDto } from './dto/get-users-dto.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) { }

  @Roles(UserRole.SUPERADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // 🔒 Admin Only: Get All Users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  public getAllPosts(@Query() getProductsDto: GetUsersDto) {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getPostParamDto: GetPostParamDto,
    return this.userService.FindAllPosts(getProductsDto);
  }

  // @Get(':id')
  // findOneById(@Param('id') id: string) {
  //   return this.userService.findOneById(+id);
  // }

  @Roles(UserRole.SUPERADMIN)    
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.findOneByEmailProvider.findOneByEmail(email);
  }

  // use email instead
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
