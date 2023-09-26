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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecluterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const recluter_service_1 = require("./recluter.service");
const DTO_1 = require("./DTO");
const exceptions_1 = require("../../configurations/exceptions");
const stats_service_1 = require("../stats/stats.service");
let RecluterController = class RecluterController {
    constructor(recluterService, statsService, exeption) {
        this.recluterService = recluterService;
        this.statsService = statsService;
        this.exeption = exeption;
    }
    async postSequence(data) {
        const sequenceFound = await this.recluterService.getSequenceBySequenceSTR(data);
        if (sequenceFound) {
            throw this.exeption.badRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'ADN existente en el sistema, favor usar otro'
            });
        }
        const response = await this.recluterService.postSequence(data);
        await this.statsService.upsertStat({
            id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID),
            count_mutant_dna: 1,
        });
        return response;
    }
    ;
};
__decorate([
    (0, common_1.Post)('mutant'),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(DTO_1.RecluterResponseDTO),
            example: {
                statusCode: 200,
                message: 'OK, you could be recluted!',
                error: false,
            },
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(DTO_1.RecluterResponseDTO),
            example: {
                statusCode: 400,
                message: ['validation(s) error'],
                error: true,
            },
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(DTO_1.RecluterResponseDTO),
            example: {
                statusCode: 403,
                message: 'shouldnt be recluter',
                error: true,
            },
        }
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Endpoin verifiacion de sequencia de ADN',
        description: `Con este endpoint podemos verificar si la sequencia pertenece a un mutante
                  en caso de que sea una secuencia de un mutante será reclutado sino, no será permitido
                  para ser reclutado. Los valores permitidos deben ser de Sequencias ADN con dimensiones NxN`,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.SequenceDTO]),
    __metadata("design:returntype", Promise)
], RecluterController.prototype, "postSequence", null);
RecluterController = __decorate([
    (0, swagger_1.ApiTags)("recluter"),
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [recluter_service_1.RecluterService,
        stats_service_1.StatsService,
        exceptions_1.ExceptionsService])
], RecluterController);
exports.RecluterController = RecluterController;
;
//# sourceMappingURL=recluter.controller.js.map