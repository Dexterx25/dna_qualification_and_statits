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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stats_service_1 = require("./stats.service");
const DTO_1 = require("./DTO");
const stastsExampleRes = {
    count_human_dna: 60,
    count_mutant_dna: 70,
    ratio: 1.16
};
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getStat() {
        return await this.statsService.getStats(Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID));
    }
    ;
};
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(DTO_1.StatsDTO),
            example: stastsExampleRes
        }
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Endpoint para traer conteos de dna de mutantes y humanos con una relacio en ratio de cada uno',
        description: `Con este endpoint podemos ver el conteo estadistico de cada componente de DNA: Humano y Mutante más la ralacion
                  entre conteo de mutante/conteo de humano en una variable llamada: ratio`,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getStat", null);
StatsController = __decorate([
    (0, swagger_1.ApiTags)("stats"),
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
exports.StatsController = StatsController;
;
//# sourceMappingURL=stats.controller.js.map