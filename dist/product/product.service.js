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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const pagination_service_1 = require("../common/pagination/provider/pagination.service");
const category_service_1 = require("../category/category.service");
const user_service_1 = require("../user/user.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const slugify_1 = require("slugify");
let ProductService = class ProductService {
    constructor(productRepository, paginationService, categoryService, userService, cacheManager) {
        this.productRepository = productRepository;
        this.paginationService = paginationService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.cacheManager = cacheManager;
    }
    async create(createProductDto) {
        const category = await this.categoryService.findOneById(createProductDto.category);
        if (category) {
            createProductDto.category = category.id.toString();
        }
        else {
            throw new common_1.NotFoundException(`category with name ${createProductDto.category} not found.`);
        }
        const seller = await this.userService.findOneById(createProductDto.sellerId);
        if (seller) {
            createProductDto.sellerId = seller.id.toString();
        }
        else {
            throw new common_1.NotFoundException(`seller with id ${createProductDto.sellerId} not found.`);
        }
        const slugTitle = (0, slugify_1.default)(createProductDto.title, {
            replacement: '-',
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            strict: true,
        });
        const { customAlphabet } = await Promise.resolve().then(() => require('nanoid'));
        const nanoid = customAlphabet('1234567890', 10);
        let productUrl;
        let isUnique = false;
        while (!isUnique) {
            const generatedId = nanoid();
            productUrl = `${slugTitle}-${generatedId}`;
            const existingProductWithUrl = await this.productRepository.findOne({
                where: { productUrl },
            });
            if (!existingProductWithUrl) {
                isUnique = true;
            }
        }
        const newProduct = this.productRepository.create({
            ...createProductDto,
            category: category.id,
            seller: seller.id,
            productUrl,
        });
        return this.productRepository.save(newProduct);
    }
    async getAllProducts(productQuery) {
        const cacheKey = `all_products:page:${productQuery.page}:limit:${productQuery.limit}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        console.log('Cache content:', cachedData);
        if (cachedData) {
            console.log('Returning products from cache');
            return cachedData;
        }
        await this.cacheManager.del(cacheKey);
        console.log('Cache cleared');
        const paginatedResult = await this.paginationService.paginationQuery({
            limit: productQuery.limit,
            page: productQuery.page,
        }, this.productRepository);
        const productsWithoutSensitiveSellerData = paginatedResult.data.map((product) => {
            const { seller, ...productDetails } = product;
            let sellerWithoutSensitiveInfo;
            if (typeof seller === 'object' && seller !== null) {
                const { password, googleId, role, ...rest } = seller;
                sellerWithoutSensitiveInfo = rest;
            }
            return {
                ...productDetails,
                seller: sellerWithoutSensitiveInfo,
            };
        });
        const result = {
            ...paginatedResult,
            data: productsWithoutSensitiveSellerData,
        };
        await this.cacheManager.set(cacheKey, result);
        return result;
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'seller'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        const { seller, ...productDetails } = product;
        let sellerWithoutSensitiveInfo;
        if (typeof seller === 'object' && seller !== null) {
            const { password, googleId, role, ...rest } = seller;
            sellerWithoutSensitiveInfo = rest;
        }
        return {
            ...productDetails,
            seller: sellerWithoutSensitiveInfo,
        };
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        const updatedProduct = Object.assign(product, updateProductDto);
        const { seller, ...result } = updatedProduct;
        return result;
    }
    async remove(id) {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        await this.productRepository.remove(product);
        return { message: `Product with id ${id} has been successfully deleted` };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pagination_service_1.PaginationProvider,
        category_service_1.CategoryService,
        user_service_1.UserService, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map