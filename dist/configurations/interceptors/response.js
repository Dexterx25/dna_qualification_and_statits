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
exports.ResponseInterceptor = exports.ResponseFormat = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const operators_1 = require("rxjs/operators");
class ResponseFormat {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseFormat.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseFormat.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ResponseFormat.prototype, "status", void 0);
exports.ResponseFormat = ResponseFormat;
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const response = httpContext.getResponse();
        return next.handle().pipe((0, operators_1.map)((data) => ({
            data,
            duration: `${Date.now() - now}ms`,
            method: request.method,
            status: response.statusCode,
        })));
    }
};
ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.js.map