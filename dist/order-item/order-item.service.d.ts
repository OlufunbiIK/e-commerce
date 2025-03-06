import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
export declare class OrderItemService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    create(createOrderItemDto: CreateOrderItemDto): any;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<string>;
    remove(id: number): string;
}
