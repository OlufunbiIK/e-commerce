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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_item_service_1 = require("./order-item.service");
const create_order_item_dto_1 = require("./dto/create-order-item.dto");
const update_order_item_dto_1 = require("./dto/update-order-item.dto");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrderItemController = class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    create(createOrderItemDto) {
        return this.orderItemService.create(createOrderItemDto);
    }
    findAll() {
        return this.orderItemService.findAll();
    }
    findOne(id) {
        return this.orderItemService.findOne(+id);
    }
    update(id, updateOrderItemDto) {
        return this.orderItemService.update(+id, updateOrderItemDto);
    }
    remove(id) {
        return this.orderItemService.remove(+id);
    }
};
exports.OrderItemController = OrderItemController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order item' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order item created successfully',
        type: order_item_entity_1.OrderItem,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_item_dto_1.CreateOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all order items' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all order items',
        type: [order_item_entity_1.OrderItem],
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single order item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order item ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the requested order item',
        type: order_item_entity_1.OrderItem,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order item not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an order item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order item ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order item updated successfully',
        type: order_item_entity_1.OrderItem,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order item not found' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_item_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete an order item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order item ID', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order item deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order item not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "remove", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, swagger_1.ApiTags)('Order Items'),
    (0, common_1.Controller)('order-items'),
    __metadata("design:paramtypes", [order_item_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=order-item.controller.js.map