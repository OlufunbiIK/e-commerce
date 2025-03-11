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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const productCategory_enum_1 = require("./enum/productCategory.enum");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        if (!Object.values(productCategory_enum_1.ProductCategory).includes(createCategoryDto.name)) {
            throw new common_1.BadRequestException(`Invalid category name: ${createCategoryDto.name}`);
        }
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(newCategory);
    }
    async findAll() {
        const result = await this.categoryRepository.find();
        return result;
    }
    async findOneById(id) {
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            throw new common_1.NotFoundException(`Invalid category ID: ${id}`);
        }
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: ['products', 'products.category'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with id ${id} not found`);
        }
        const productsWithoutSeller = category.products.map(product => {
            const { seller, ...productWithoutSeller } = product;
            return productWithoutSeller;
        });
        return { ...category, products: productsWithoutSeller };
    }
    async findOneByName(categoryName) {
        const category = await this.categoryRepository.findOne({
            where: { name: categoryName },
            relations: ['products', 'products.category'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with name ${categoryName} not found.`);
        }
        const productsWithoutSeller = category.products.map(product => {
            const { seller, ...productWithoutSeller } = product;
            return productWithoutSeller;
        });
        return { ...category, products: productsWithoutSeller };
    }
    async remove(id) {
        const categoryExists = this.categoryRepository.findOne({
            where: { id },
        });
        if (!categoryExists) {
            throw new common_1.NotFoundException(`Category with id ${id} not found.`);
        }
        const categoryWithProducts = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (categoryWithProducts.products.length > 0) {
            throw new common_1.BadRequestException(`Category ${id} cannot be deleted as it has products.`);
        }
        await this.categoryRepository.delete({ id });
        return { message: `Category ${id} has been deleted successfully.` };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map