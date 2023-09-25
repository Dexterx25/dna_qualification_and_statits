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
exports.JWTService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let JWTService = class JWTService {
    constructor(config) {
        this.config = config;
        this.decodeToken = (token) => {
            return (0, jsonwebtoken_1.decode)(token);
        };
        this.verifyAccess = (token) => {
            const access = this.config.get("JWT_ACCESS_KEY");
            try {
                return (0, jsonwebtoken_1.verify)(token, access);
            }
            catch (error) {
                throw new common_1.ForbiddenException("Invalid access token");
            }
        };
        this.verifyRefresh = (token) => {
            const refresh = this.config.get("JWT_REFRESH_KEY");
            try {
                return (0, jsonwebtoken_1.verify)(token, refresh);
            }
            catch (error) {
                throw new common_1.ForbiddenException("Invalid refresh token");
            }
        };
        this.createAccess = async (payload) => {
            const access = this.config.get("JWT_ACCESS_KEY");
            const token = (0, jsonwebtoken_1.sign)(payload, access, { expiresIn: "8h" });
            return token;
        };
        this.createRefresh = async (payload) => {
            const access = this.config.get("JWT_REFRESH_KEY");
            const token = (0, jsonwebtoken_1.sign)(payload, access, { expiresIn: "14d" });
            return token;
        };
        this.signToken = async (payload) => {
            const secret = this.config.get("JWT_SIGN_KEY");
            if (!secret)
                throw new common_1.NotFoundException("Secret not Found");
            const token = await (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '14d' });
            const refreshToken = await (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '15d' });
            return { token, refreshToken };
        };
    }
};
JWTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.service.js.map