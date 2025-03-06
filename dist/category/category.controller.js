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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
const userRole_enum_1 = require("../user/enum/userRole.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOneById(id);
    }
    remove(id) {
        return this.categoryService.remove(+id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully.' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden: Only SUPERADMIN can create categories.',
    }),
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all categories.' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a category by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the category',
        example: '1',
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Category deleted successfully.' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden: Only SUPERADMIN can delete categories.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the category',
        example: '1',
    }),
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map