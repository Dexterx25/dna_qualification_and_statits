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
exports.RecluterSequenceDNAMiddleware = void 0;
const common_1 = require("@nestjs/common");
const usesCases_1 = require("./usesCases");
const formater_1 = require("../../../utils/formater");
const stats_service_1 = require("../../stats/stats.service");
let RecluterSequenceDNAMiddleware = class RecluterSequenceDNAMiddleware {
    constructor(statsService, componentValidation) {
        this.statsService = statsService;
        this.componentValidation = componentValidation;
    }
    async use(req, _res, next) {
        const { dna } = req.body;
        const matriz = (0, formater_1.FormatterToArray2dFromArrayString)(dna);
        const instanceArrLR = new usesCases_1.DiagonalLeftRigthCatch();
        const instanceArrRL = new usesCases_1.DiagonalRigthLeftCatch();
        const instanceArrV = new usesCases_1.VerticalCatch();
        const arrLR = instanceArrLR.execute(matriz).arr;
        const arrRL = instanceArrRL.execute(matriz).arr;
        const arrV = instanceArrV.execute(matriz).arr;
        let dataStatToSave;
        function statsCallBack(dataStats) {
            dataStatToSave = dataStats;
        }
        const validations = [
            this.componentValidation.typeDNAValidation([arrLR, arrRL, arrV, dna], statsCallBack),
        ];
        return Promise.all(validations)
            .then(() => next())
            .catch((err) => next(err))
            .finally(async () => { if (dataStatToSave)
            await this.statsService.upsertStat(dataStatToSave); });
    }
};
RecluterSequenceDNAMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stats_service_1.StatsService,
        usesCases_1.ComponentDNAValidation])
], RecluterSequenceDNAMiddleware);
exports.RecluterSequenceDNAMiddleware = RecluterSequenceDNAMiddleware;
//# sourceMappingURL=recluter.middleware.js.map