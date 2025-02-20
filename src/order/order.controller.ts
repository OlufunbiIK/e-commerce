import { Controller, Put, Get, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
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
}
