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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrderItemService = class OrderItemService {
    constructor(orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
    create(createOrderItemDto) {
        return this.orderItemRepository.create(createOrderItemDto);
    }
    findAll() {
        return `This action returns all orderItem`;
    }
    findOne(id) {
        return `This action returns a #${id} orderItem`;
    }
    async update(id, updateOrderItemDto) {
        await this.orderItemRepository.update(id, updateOrderItemDto);
        return `This action updates a #${id} orderItem`;
    }
    remove(id) {
        return `This action removes a #${id} orderItem`;
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], OrderItemService);
//# sourceMappingURL=order-item.service.js.map