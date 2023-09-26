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
exports.RecluterResponseDTO = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class RecluterResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Status code Response'
    }),
    __metadata("design:type", Number)
], RecluterResponseDTO.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'message(s) to use in response'
    }),
    __metadata("design:type", Object)
], RecluterResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'boolean or name error identificator'
    }),
    __metadata("design:type", Object)
], RecluterResponseDTO.prototype, "error", void 0);
exports.RecluterResponseDTO = RecluterResponseDTO;
//# sourceMappingURL=recluter.response.js.map