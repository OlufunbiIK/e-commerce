import { Controller, Put, Get, Param, Body, UseGuards, Request, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from './enum/orderStatus.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from 'src/user/enum/userRole.enum';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Ensure only admins can update order status
  async updateOrderStatus(
    @Param('id') orderId: number,
    @Body('status') status: OrderStatus,
    @Request() req
  ) {
    return this.orderService.updateOrderStatus(orderId, status, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') orderId: number, @Request() req) {
    const order = await this.orderService.getOrderById(orderId, req.user);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  // ✅ Users View Order History
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Param('userId') userId: number, @Request() req) {
    if (req.user.id !== userId && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to view these orders.');
    }
    return this.orderService.getUserOrders(userId);
  }

  // ✅ Admins Retrieve All Orders
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  // endpoint that allows sellers to fetch their orders
  @Get('seller/:sellerId')
@UseGuards(JwtAuthGuard)
async getSellerOrders(@Param('sellerId') sellerId: number, @Request() req) {
  if (req.user.id !== sellerId && req.user.role !== UserRole.ADMIN) {
    throw new ForbiddenException('You are not authorized to view these orders.');
  }
  return this.orderService.getSellerOrders(sellerId);
}

}
