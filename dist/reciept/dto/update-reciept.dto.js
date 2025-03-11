"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecieptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_reciept_dto_1 = require("./create-reciept.dto");
class UpdateRecieptDto extends (0, swagger_1.PartialType)(create_reciept_dto_1.CreateRecieptDto) {
}
exports.UpdateRecieptDto = UpdateRecieptDto;
//# sourceMappingURL=update-reciept.dto.js.map