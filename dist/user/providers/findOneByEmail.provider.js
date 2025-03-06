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
exports.FindOneByEmailProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const userRole_enum_1 = require("../enum/userRole.enum");
let FindOneByEmailProvider = class FindOneByEmailProvider {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOneByEmail(email) {
        let user;
        try {
            user = await this.userRepository.findOne({
                where: { email, role: userRole_enum_1.UserRole.CUSTOMER },
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("There was an error fetching the user", {
                description: "Error fetching user",
                cause: error,
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException("User does not exist");
        }
        return user;
    }
};
exports.FindOneByEmailProvider = FindOneByEmailProvider;
exports.FindOneByEmailProvider = FindOneByEmailProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FindOneByEmailProvider);
//# sourceMappingURL=findOneByEmail.provider.js.map