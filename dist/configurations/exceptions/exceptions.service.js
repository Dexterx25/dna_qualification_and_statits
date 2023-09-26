"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsService = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsService = class ExceptionsService {
    notFoundException(data) {
        throw new common_1.NotFoundException({ ...data, error: true });
    }
    badRequestException(data) {
        throw new common_1.BadRequestException({ ...data, error: true });
    }
    internalServerErrorException(data) {
        throw new common_1.InternalServerErrorException({ ...data, error: true });
    }
    forbiddenException(data) {
        throw new common_1.ForbiddenException({ ...data, error: true });
    }
    unauthorizedException(data) {
        throw new common_1.UnauthorizedException({ ...data, error: true });
    }
    conflicException(data) {
        throw new common_1.ConflictException({ ...data, error: true });
    }
};
ExceptionsService = __decorate([
    (0, common_1.Injectable)()
], ExceptionsService);
exports.ExceptionsService = ExceptionsService;
//# sourceMappingURL=exceptions.service.js.map