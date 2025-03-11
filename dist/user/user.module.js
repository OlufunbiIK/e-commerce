"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const findOneByEmail_provider_1 = require("./providers/findOneByEmail.provider");
const pagination_service_1 = require("../common/pagination/providers/pagination.service");
const pagination_module_1 = require("../common/pagination/pagination.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [pagination_module_1.PaginationModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, pagination_service_1.PaginationProvider, findOneByEmail_provider_1.FindOneByEmailProvider],
        exports: [user_service_1.UserService, typeorm_1.TypeOrmModule, findOneByEmail_provider_1.FindOneByEmailProvider],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map