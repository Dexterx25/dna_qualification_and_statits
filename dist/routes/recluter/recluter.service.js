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
exports.RecluterService = void 0;
const common_1 = require("@nestjs/common");
const repositoriesMongoDB_1 = require("../../database/repositoriesMongoDB");
let RecluterService = class RecluterService {
    constructor(sequenceRepository) {
        this.sequenceRepository = sequenceRepository;
    }
    async postSequence(dnaData) {
        return await this.sequenceRepository.create({ dna: JSON.stringify(dnaData.dna) });
    }
    ;
    async getSequenceBySequenceSTR({ dna }) {
        return await this.sequenceRepository.findOneByDNA({ dna: JSON.stringify(dna) });
    }
};
RecluterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositoriesMongoDB_1.DNASequenceMongoRepository])
], RecluterService);
exports.RecluterService = RecluterService;
;
//# sourceMappingURL=recluter.service.js.map