"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const orderStatus_enum_1 = require("./enum/orderStatus.enum");
const user_entity_1 = require("../user/entities/user.entity");
const userRole_enum_1 = require("../user/enum/userRole.enum");
let OrderService = class OrderService {
    constructor(orderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    async createOrder(userId, totalPrice) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const order = this.orderRepository.create({
            user,
            totalPrice,
            status: orderStatus_enum_1.OrderStatus.PENDING,
        });
        return this.orderRepository.save(order);
    }
    async updateOrderStatus(orderId, status, adminUser) {
        if (adminUser.role !== userRole_enum_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only admins can update order statuses.');
        }
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['user'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        order.status = status;
        return await this.orderRepository.save(order);
    }
    async getOrderById(orderId, user) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['user'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        if (user.role !== userRole_enum_1.UserRole.ADMIN && order.user.id !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to view this order.');
        }
        return order;
    }
    async getUserOrders(userId) {
        return await this.orderRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'orderItems', 'orderItems.product'],
            order: { id: 'DESC' },
        });
    }
    async getAllOrders() {
        return await this.orderRepository.find({
            relations: ['user', 'orderItems', 'orderItems.product'],
            order: { id: 'DESC' },
        });
    }
    async getSellerOrders(sellerId) {
        return await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.orderItems', 'orderItem')
            .leftJoinAndSelect('orderItem.product', 'product')
            .where('product.sellerId = :sellerId', { sellerId })
            .orderBy('order.createdAt', 'DESC')
            .getMany();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], OrderService);
//# sourceMappingURL=order.service.js.map