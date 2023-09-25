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
exports.UserDTO = exports.UserToRegisterDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserToRegisterDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserToRegisterDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserToRegisterDTO.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserToRegisterDTO.prototype, "nikename", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserToRegisterDTO.prototype, "names", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserToRegisterDTO.prototype, "lastnames", void 0);
exports.UserToRegisterDTO = UserToRegisterDTO;
class UserDTO {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "nikename", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "names", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "lastnames", void 0);
exports.UserDTO = UserDTO;
//# sourceMappingURL=index.js.map