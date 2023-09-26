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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const tedis_1 = require("tedis");
let RedisService = class RedisService {
    constructor(config) {
        this.logger = new common_1.Logger('Redis');
        this.generateSessionKey = (type, key) => `${type}:${key}`;
        this.getSessionValue = async (type, key) => {
            const redisKey = this.generateSessionKey(type, key);
            this.logger.log(`Getting session key -> ${redisKey}`);
            return await this.tedis.get(redisKey);
        };
        this.setSessionValue = async (type, id, token, expiredAt) => {
            const redisKey = this.generateSessionKey(type, id);
            try {
                await this.tedis.setex(redisKey, expiredAt, token);
                this.logger.log(`New session created -> ${redisKey}`);
            }
            catch (error) {
                this.logger.error(`Error creating session ${id}`);
                throw error;
            }
        };
        this.deleteSessionValue = async (id) => {
            const accessKey = this.generateSessionKey('access', id);
            const refreshKey = this.generateSessionKey('refresh', id);
            await this.tedis.del(accessKey, refreshKey);
        };
        this.deleteKey = async (key) => {
            await this.tedis.del(key);
        };
        this.existsKey = async (type, key) => {
            const redisKey = this.generateSessionKey(type, key);
            return await this.tedis.exists(redisKey);
        };
        let redis = {
            password: config.get('REDIS_PASSWORD'),
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT'),
        };
        this.tedis = new tedis_1.Tedis(redis);
        this.logger.log('Redis connection established');
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map