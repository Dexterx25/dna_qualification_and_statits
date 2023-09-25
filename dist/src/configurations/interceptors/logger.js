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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logger_1 = require("../../utils/logger");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const ip = this.getIP(request);
        this.logger.log(`Incoming Request on ${request.path}`, `method=${request.method} ip=${ip}`);
        return next.handle().pipe((0, operators_1.tap)(() => {
            this.logger.log(`End Request for ${request.path}`, `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`);
        }));
    }
    getIP(request) {
        let ip;
        const ipAddr = request.headers['x-forwarded-for'];
        if (ipAddr) {
            const list = ipAddr.split(',');
            ip = list[list.length - 1];
        }
        else {
            ip = request.connection.remoteAddress;
        }
        return ip.replace('::ffff:', '');
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logger.js.map