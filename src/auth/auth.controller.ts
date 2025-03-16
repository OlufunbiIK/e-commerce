import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with email, password, and role.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Public()
  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user and returns a JWT token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Refresh Access Token',
    description: 'Provides a new access token using a valid refresh token.',
  })
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'New access token generated' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  @Public()
  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }


  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This endpoint initiates Google OAuth flow
    // The actual redirect happens in Passport
  }
  
  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const authResult = await this.authService.googleLogin(req.user);
      
      // Redirect to frontend with token as query parameter
      // You can customize this URL based on your frontend setup
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
      
      // Redirect to frontend with token
      return res.redirect(`${frontendUrl}/auth/google-callback?token=${authResult.access_token}&refreshToken=${authResult.refreshToken}`);
    } catch (error) {
      // Handle errors
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:4200'}/auth/error?message=${encodeURIComponent(error.message)}`);
    }
  }
}
