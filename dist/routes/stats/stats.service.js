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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const repositoriesMongoDB_1 = require("../../database/repositoriesMongoDB");
let StatsService = class StatsService {
    constructor(statsRepository) {
        this.statsRepository = statsRepository;
    }
    async upsertStat(data) {
        const { id } = data;
        const statFound = await this.getStats(id);
        if (statFound) {
            const Modified = {
                id,
                count_human_dna: (data.count_human_dna || 0) + statFound.count_human_dna,
                count_mutant_dna: (data.count_mutant_dna || 0) + statFound.count_mutant_dna,
            };
            Modified.ratio = Modified.count_mutant_dna / Modified.count_human_dna;
            await this.statsRepository.findOneAndUpdate({ id }, Modified);
        }
        else {
            await this.statsRepository.create(data);
        }
    }
    async getStats(id) {
        const dataRetunr = await this.statsRepository.findByCondition({ id });
        return dataRetunr;
    }
};
StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositoriesMongoDB_1.StatsMongoReqpository])
], StatsService);
exports.StatsService = StatsService;
;
//# sourceMappingURL=stats.service.js.map