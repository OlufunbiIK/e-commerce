import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@ApiTags('Order Items') // Grouping in Swagger
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({
    status: 201,
    description: 'Order item created successfully',
    type: OrderItem,
  })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Retrieve all order items' })
  @ApiResponse({
    status: 200,
    description: 'Returns all order items',
    type: [OrderItem],
  })
  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single order item by ID' })
  @ApiParam({ name: 'id', description: 'Order item ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested order item',
    type: OrderItem,
  })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order item ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Order item updated successfully',
    type: OrderItem,
  })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order item ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Order item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
