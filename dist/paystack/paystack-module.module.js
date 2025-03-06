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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const paystack_service_service_1 = require("./paystack-service.service");
const paystack_controller_controller_1 = require("./paystack-controller.controller");
const reciept_module_1 = require("../reciept/reciept.module");
let PaystackModule = class PaystackModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.PaystackModule = PaystackModule;
exports.PaystackModule = PaystackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            reciept_module_1.ReceiptModule,
            typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment]),
        ],
        controllers: [paystack_controller_controller_1.PaystackController],
        providers: [paystack_service_service_1.PaystackService],
        exports: [paystack_service_service_1.PaystackService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], PaystackModule);
//# sourceMappingURL=paystack-module.module.js.map