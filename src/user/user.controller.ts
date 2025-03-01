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
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enum/userRole.enum';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users') // Grouping in Swagger UI
@ApiBearerAuth() // Requires JWT authentication (if applicable)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) {}

  @Roles(UserRole.SUPERADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only Superadmin can create users',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('admins')
  @ApiOperation({ summary: 'Get all admins (Superadmin only)' })
  findAllAdmins() {
    return this.userService.findAllAdmins();
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('sellers')
  @ApiOperation({ summary: 'Get all sellers' })
  findAllSellers() {
    return this.userService.findAllSellers();
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('admin/:email')
  @ApiOperation({ summary: 'Find an admin by email' })
  @ApiParam({
    name: 'email',
    example: 'admin@example.com',
    description: 'Admin email',
  })
  findAdminByEmail(@Param('email') email: string) {
    return this.userService.findAdminByEmail(email);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get('seller/:email')
  @ApiOperation({ summary: 'Find a seller by email' })
  @ApiParam({
    name: 'email',
    example: 'seller@example.com',
    description: 'Seller email',
  })
  findSellerByEmail(@Param('email') email: string) {
    return this.userService.findSellerByEmail(email);
  }

  @Roles(UserRole.SUPERADMIN)
  @Get(':email')
  @ApiOperation({ summary: 'Find a user by email' })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  findOneByEmail(@Param('email') email: string) {
    return this.findOneByEmailProvider.findOneByEmail(email);
  }

  @Roles(UserRole.SUPERADMIN)
  @Patch(':email')
  @ApiOperation({ summary: 'Update a user by email' })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Roles(UserRole.SUPERADMIN)
  @Delete(':email')
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
