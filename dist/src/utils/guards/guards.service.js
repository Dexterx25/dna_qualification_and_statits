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
exports.GuardsService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../configurations/redis/redis.service");
let GuardsService = class GuardsService {
    constructor(redis) {
        this.redis = redis;
        this.validateAccess = async (token, user) => {
            const storedToken = await this.redis.getSessionValue('access', user);
            if (storedToken !== token)
                throw new common_1.ForbiddenException('This access token is not longer valid');
            return true;
        };
        this.validateRefresh = async (token, user) => {
            const storedToken = await this.redis.getSessionValue('refresh', user);
            if (storedToken !== token)
                throw new common_1.ForbiddenException('This refresh token is not longer valid');
            return true;
        };
        this.validateSignToken = async (token, member) => {
            const storedToken = await this.redis.getSessionValue('sign', member);
            if (storedToken !== token)
                throw new common_1.ForbiddenException('This sign token is not longer valid');
            return true;
        };
    }
};
GuardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], GuardsService);
exports.GuardsService = GuardsService;
//# sourceMappingURL=guards.service.js.map