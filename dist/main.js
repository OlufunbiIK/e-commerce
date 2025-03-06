"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const data_response_1 = require("./common/interceptors/data-response/data-response/data-response");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('e-commerce group project')
        .setDescription('API documentation for e-commerce api project')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalInterceptors(new data_response_1.DataResponseInterceptor());
    if (process.env.NODE_ENV !== 'production') {
        const port = process.env.PORT || 3000;
        await app.listen(port);
        console.log(`🚀 Server running on http://localhost:${port}`);
        console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
    }
    return app;
}
bootstrap();
//# sourceMappingURL=main.js.map