"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT) || 3000,
    db: {
        url: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=database.config.js.map