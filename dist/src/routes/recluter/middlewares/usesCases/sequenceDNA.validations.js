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
exports.ComponentDNAValidation = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../configurations/exceptions");
const interfaces_1 = require("../../../stats/interfaces");
let ComponentDNAValidation = class ComponentDNAValidation {
    constructor(exeption) {
        this.exeption = exeption;
        this.sequencesMutant = {
            C: (s) => s.includes('CCCC'),
            A: (s) => s.includes('AAAA'),
            T: (s) => s.includes('TTTT'),
            G: (s) => s.includes('GGGG')
        };
    }
    async typeDNAValidation(arr, callBack) {
        let counter = 0;
        const casesValidation = Object.keys(this.sequencesMutant);
        arr.forEach((concretArr) => {
            concretArr.forEach((sequence) => {
                casesValidation.forEach((compoDNA) => {
                    counter += Number(this.sequencesMutant[compoDNA](sequence));
                });
            });
        });
        if (counter < Number(process.env.COUNTER_INITIAL_SEQUENCE_MUTANT)) {
            callBack({
                id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID),
                count_human_dna: 1,
            });
            throw this.exeption.forbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: 'No es un ADN mutante, no puede ser reclutado'
            });
        }
    }
    async dimensionValidation(arr) {
        const rows = arr[0].length;
        const columns = arr[0][0].length;
        const areaArray = rows * columns;
        const newDna = arr.flatMap(i => i).map(i => i.split('')).flatMap(i => i);
        const limitDimension = Number(process.env.LIMIT_DIMENSION_DNA);
        if (newDna.length !== areaArray) {
            throw this.exeption.badRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'No es un array NxN'
            });
        }
        if (rows > limitDimension && columns > limitDimension) {
            throw this.exeption.badRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'El limite maximo es una matriz de 10x10 debido a limites de capacidad de base de datos'
            });
        }
    }
    async enableComponentesValidation(dna) {
        const DNAAvaliable = ['A', 'C', 'G', 'T'];
        const newDna = dna.flatMap(i => i).map(i => i.split('')).flatMap(i => i);
        const charactersNotAvaliable = [];
        const setArr = new Set(newDna);
        setArr.forEach((charSent) => {
            const idxCharSent = DNAAvaliable.findIndex(charA => charA === charSent);
            if (idxCharSent === -1) {
                charactersNotAvaliable.push(charSent);
            }
        });
        if (charactersNotAvaliable.length) {
            throw this.exeption.badRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `ADN con componentes desconocidos: ${charactersNotAvaliable.join(', ')}`
            });
        }
    }
};
ComponentDNAValidation = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exceptions_1.ExceptionsService])
], ComponentDNAValidation);
exports.ComponentDNAValidation = ComponentDNAValidation;
//# sourceMappingURL=sequenceDNA.validations.js.map