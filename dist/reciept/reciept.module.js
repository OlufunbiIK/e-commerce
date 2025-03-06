"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reciept_entity_1 = require("./entities/reciept.entity");
const reciept_controller_1 = require("./reciept.controller");
const reciept_service_1 = require("./reciept.service");
let ReceiptModule = class ReceiptModule {
};
exports.ReceiptModule = ReceiptModule;
exports.ReceiptModule = ReceiptModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reciept_entity_1.Receipt])],
        controllers: [reciept_controller_1.ReceiptController],
        providers: [reciept_service_1.ReceiptService],
        exports: [reciept_service_1.ReceiptService],
    })
], ReceiptModule);
//# sourceMappingURL=reciept.module.js.map