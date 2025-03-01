import {
  Controller,
  Put,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderStatus } from './enum/orderStatus.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/enum/userRole.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Orders') // Groups all endpoints under "Orders" in Swagger UI
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Post('create')
  async createOrder(@Body() body) {
    return this.orderService.createOrder(body.userId, body.totalPrice);
  }

  @ApiOperation({ summary: 'Update order status (Admin only)' })
  @ApiBearerAuth() // Requires JWT authentication
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only Admins can update orders',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateOrderStatus(
    @Param('id') orderId: number,
    @Body('status') status: OrderStatus,
    @Request() req,
  ) {
    return this.orderService.updateOrderStatus(orderId, status, req.user);
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') orderId: number, @Request() req) {
    const order = await this.orderService.getOrderById(orderId, req.user);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  @ApiOperation({ summary: 'Get all orders for a user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Cannot view other users’ orders',
  })
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Param('userId') userId: number, @Request() req) {
    if (req.user.id !== userId && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to view these orders.',
      );
    }
    return this.orderService.getUserOrders(userId);
  }

  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'All orders retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only Admins can access this',
  })
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get all orders for a seller' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Seller orders retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Cannot view other sellers’ orders',
  })
  @Get('seller/:sellerId')
  @UseGuards(JwtAuthGuard)
  async getSellerOrders(@Param('sellerId') sellerId: number, @Request() req) {
    if (req.user.id !== sellerId && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to view these orders.',
      );
    }
    return this.orderService.getSellerOrders(sellerId);
  }
}
