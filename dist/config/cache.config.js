"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCacheModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager-ioredis");
let CustomCacheModule = class CustomCacheModule {
};
exports.CustomCacheModule = CustomCacheModule;
exports.CustomCacheModule = CustomCacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: () => ({
                    store: redisStore,
                    host: 'localhost',
                    port: 6379,
                    max: 50,
                    ttl: 5000,
                }),
            }),
        ],
        exports: [cache_manager_1.CacheModule],
    })
], CustomCacheModule);
//# sourceMappingURL=cache.config.js.map