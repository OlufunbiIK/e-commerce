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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const pagination_service_1 = require("../common/pagination/providers/pagination.service");
const findOneByEmail_provider_1 = require("./providers/findOneByEmail.provider");
const userRole_enum_1 = require("./enum/userRole.enum");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userRepository, paginationService, findOneByEmailProvider) {
        this.userRepository = userRepository;
        this.paginationService = paginationService;
        this.findOneByEmailProvider = findOneByEmailProvider;
    }
    async create(createUserDto) {
        const existingAdmin = await this.userRepository.findOne({
            where: { email: createUserDto.email, role: userRole_enum_1.UserRole.ADMIN },
        });
        if (existingAdmin) {
            throw new common_1.NotFoundException('Admin already exists');
        }
        createUserDto.role = userRole_enum_1.UserRole.ADMIN;
        const hashedPassword = await bcrypt.hash('1234password', 10);
        createUserDto.password = hashedPassword;
        createUserDto.isVerified = false;
        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }
    async findAllAdmins() {
        const admins = await this.userRepository.find({
            where: { role: userRole_enum_1.UserRole.ADMIN },
        });
        const adminsWithoutSensitiveData = admins.map(admin => {
            const { password, googleId, storeName, storeDescription, storeAddress, ...adminWithoutSensitiveData } = admin;
            return adminWithoutSensitiveData;
        });
        return { admins: adminsWithoutSensitiveData };
    }
    async findAdminByEmail(email) {
        const admin = await this.userRepository.findOne({
            where: { email, role: userRole_enum_1.UserRole.ADMIN },
        });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with email ${email} not found`);
        }
        const { password, googleId, storeName, storeDescription, storeAddress, ...result } = admin;
        return result;
    }
    async findAllSellers() {
        const sellers = await this.userRepository.find({
            where: { role: userRole_enum_1.UserRole.SELLER },
            relations: ['products', 'products.seller'],
        });
        const sellersWithoutSensitiveData = sellers.map(admin => {
            const { password, googleId, ...sellerWithoutSensitiveData } = admin;
            return sellerWithoutSensitiveData;
        });
        return { sellers: sellersWithoutSensitiveData };
    }
    async findSellerByEmail(email) {
        const seller = await this.userRepository.findOne({
            where: { email, role: userRole_enum_1.UserRole.SELLER },
            relations: ['products', 'products.seller'],
        });
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with email ${email} not found`);
        }
        const { password, googleId, ...result } = seller;
        return result;
    }
    async findOneById(id) {
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            throw new common_1.NotFoundException(`Invalid user ID: ${id}`);
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`user with id ${id} not found`);
        }
        return user;
    }
    update(email, updateUserDto) {
        return `This action updates a #${email} user`;
    }
    remove(email) {
        return `This action removes a #${email} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, pagination_service_1.PaginationProvider,
        findOneByEmail_provider_1.FindOneByEmailProvider])
], UserService);
//# sourceMappingURL=user.service.js.map