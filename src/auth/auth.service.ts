/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // ✅ User Registration
  async register(registerDto: CreateUserDto) {
    const { firstName, lastName, email, password, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isVerified: true, // Default: false until email verification is implemented but for the sake of testing it is true for now
    });

    await this.userRepository.save(user);
    return { message: 'User registered successfully', user };
  }

  // // ✅ User Login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    // Check verification status
    if (!user.isVerified)
      throw new UnauthorizedException('Account not verified');

    // Generate JWT Token
    const payload = { sub: user.id, email: user.email, role: user.role }; // 🔥 Use `sub` (standard JWT claim)

    const token = this.jwtService.sign(payload, { expiresIn: '1h' }); // 🔥 Explicit expiration time

    return { access_token: token };
  }
}
