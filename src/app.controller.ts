import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Welcome') // Groups this controller under "Welcome" in Swagger UI
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Welcome to Our E-Commerce API',
    description:
      'This endpoint returns a friendly welcome message, introducing users to our powerful and feature-rich eCommerce API.',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message successfully retrieved.',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
