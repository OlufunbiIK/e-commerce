"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const pagination_module_1 = require("../common/pagination/pagination.module");
const pagination_service_1 = require("../common/pagination/providers/pagination.service");
const category_module_1 = require("../category/category.module");
const user_module_1 = require("../user/user.module");
const cache_config_1 = require("../config/cache.config");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_module_1.CategoryModule,
            cache_config_1.CustomCacheModule,
            pagination_module_1.PaginationModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, pagination_service_1.PaginationProvider],
        exports: [typeorm_1.TypeOrmModule, product_service_1.ProductService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map