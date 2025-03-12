"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT) || 3000,
    db: {
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'funbi',
        database: 'ecommerce-project',
        url: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=database.config.js.map