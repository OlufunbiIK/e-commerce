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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProvider = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailProvider = class MailProvider {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async WelcomeEmail(user) {
        await this.mailerService.sendMail({
            to: user.email,
            from: `helpdesk from e-commerce.com`,
            subject: `welcome to e-commerce `,
            template: './welcome',
            context: {
                name: user.firstName,
                email: user.email,
                loginUrl: 'http://localhost:3000/',
            }
        });
    }
};
exports.MailProvider = MailProvider;
exports.MailProvider = MailProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailProvider);
//# sourceMappingURL=mail.provider.js.map