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
exports.AccessGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const { verify } = require('jsonwebtoken');
let AccessGuard = class AccessGuard {
    constructor(config) {
        this.config = config;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            throw new common_1.UnauthorizedException('Null Access Token');
        try {
            const user = verify(token, `${this.config.get('JWT_SIGN_KEY')}`);
            req.session = user;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid Access Token');
        }
        return true;
    }
};
AccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AccessGuard);
exports.AccessGuard = AccessGuard;
//# sourceMappingURL=access.guard.js.map