"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT) || 3000,
    db: {
        host: process.env.NODE_ENV === 'production' ? process.env.PGHOST : 'localhost',
        port: parseInt(process.env.NODE_ENV === 'production' ? process.env.PGPORT : '5433'),
        username: process.env.NODE_ENV === 'production' ? process.env.PGUSER : 'postgres',
        password: process.env.NODE_ENV === 'production' ? process.env.PGPASSWORD : 'funbi',
        database: process.env.NODE_ENV === 'production'
            ? process.env.PGDATABASE
            : 'ecommerce-project',
        url: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=database.config.js.map