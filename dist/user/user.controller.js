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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const userRole_enum_1 = require("./enum/userRole.enum");
const findOneByEmail_provider_1 = require("./providers/findOneByEmail.provider");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService, findOneByEmailProvider) {
        this.userService = userService;
        this.findOneByEmailProvider = findOneByEmailProvider;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findAllAdmins() {
        return this.userService.findAllAdmins();
    }
    findAllSellers() {
        return this.userService.findAllSellers();
    }
    findAdminByEmail(email) {
        return this.userService.findAdminByEmail(email);
    }
    findSellerByEmail(email) {
        return this.userService.findSellerByEmail(email);
    }
    findOneByEmail(email) {
        return this.findOneByEmailProvider.findOneByEmail(email);
    }
    update(email, updateUserDto) {
        return this.userService.update(email, updateUserDto);
    }
    remove(email) {
        return this.userService.remove(email);
    }
};
exports.UserController = UserController;
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully created' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - Only Superadmin can create users',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)('admins'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all admins (Superadmin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdmins", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)('sellers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all sellers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllSellers", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)('admin/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Find an admin by email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        example: 'admin@example.com',
        description: 'Admin email',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAdminByEmail", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)('seller/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a seller by email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        example: 'seller@example.com',
        description: 'Seller email',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findSellerByEmail", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a user by email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        example: 'user@example.com',
        description: 'User email',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneByEmail", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Patch)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user by email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        example: 'user@example.com',
        description: 'User email',
    }),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Delete)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by email' }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        example: 'user@example.com',
        description: 'User email',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        findOneByEmail_provider_1.FindOneByEmailProvider])
], UserController);
//# sourceMappingURL=user.controller.js.map