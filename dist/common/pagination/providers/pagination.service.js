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
exports.PaginationProvider = void 0;
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
let PaginationProvider = class PaginationProvider {
    constructor(request) {
        this.request = request;
    }
    async paginationQuery(paginatedQueryDto, repository) {
        const result = await repository.find({
            skip: paginatedQueryDto.limit * (paginatedQueryDto.page - 1),
            take: paginatedQueryDto.limit,
        });
        const baseUrl = this.request.protocol + '://' + this.request.headers.host + '/';
        console.log(baseUrl);
        const newUrl = new URL(this.request.url, baseUrl);
        console.log(newUrl);
        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / paginatedQueryDto.limit);
        const currentPage = paginatedQueryDto.page;
        console.log(currentPage);
        const nextPage = paginatedQueryDto.page === totalPages
            ? paginatedQueryDto.page
            : paginatedQueryDto.page + 1;
        const previousPage = paginatedQueryDto.page === 1
            ? paginatedQueryDto.page
            : paginatedQueryDto.page - 1;
        const finalResponse = {
            data: result,
            meta: {
                itemsPerPage: paginatedQueryDto.limit,
                totalItemsPerPage: totalItems,
                currentPage: paginatedQueryDto.page,
                totalPages: totalPages,
            },
            links: {
                firstPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=1`,
                lastPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${totalPages}`,
                currentPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${currentPage}`,
                previousPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${previousPage}`,
                nextPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${nextPage}`,
            },
        };
        return finalResponse;
    }
};
exports.PaginationProvider = PaginationProvider;
exports.PaginationProvider = PaginationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object])
], PaginationProvider);
//# sourceMappingURL=pagination.service.js.map