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
exports.loginAdminUserDTO = exports.registerAdminUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class registerAdminUserDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "rePassword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "nikename", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "names", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], registerAdminUserDTO.prototype, "lastnames", void 0);
exports.registerAdminUserDTO = registerAdminUserDTO;
class loginAdminUserDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], loginAdminUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], loginAdminUserDTO.prototype, "password", void 0);
exports.loginAdminUserDTO = loginAdminUserDTO;
//# sourceMappingURL=index.js.map