"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_provider_1 = require("./providers/mail.provider");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('MAIL_HOST'),
                        secure: false,
                        port: config.get('MAIL_PORT'),
                        auth: {
                            user: config.get('SMTP_USERNAME'),
                            pass: config.get('SMTP_PASSWORD'),
                        },
                        default: {
                            from: `no-reply-<helpdesk@estatte-management>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, 'template'),
                            adapter: new ejs_adapter_1.EjsAdapter({
                                inlineCssEnabled: true,
                            }),
                            Option: {
                                strict: false,
                            },
                        },
                    },
                }),
                imports: undefined,
            }),
        ],
        providers: [mail_provider_1.MailProvider],
        exports: [mail_provider_1.MailProvider],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map