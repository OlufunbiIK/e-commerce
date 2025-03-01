import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // Groups this controller under "App" in Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get Welcome Message',
    description: 'Returns a simple welcome message from the server.',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved message' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
