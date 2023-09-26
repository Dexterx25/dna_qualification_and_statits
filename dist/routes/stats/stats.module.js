"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const stats_controller_1 = require("./stats.controller");
const stats_service_1 = require("./stats.service");
const repositoriesPostgreSQL_1 = require("../../database/repositoriesPostgreSQL");
const exceptions_1 = require("../../configurations/exceptions");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_1 = require("../../database/mongo");
const repositoriesMongoDB_1 = require("../../database/repositoriesMongoDB");
const Stats_schema_1 = require("../../database/mongo/schemas/Stats.schema");
let StatsModule = class StatsModule {
};
StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exceptions_1.ExceptionsModule,
            mongoose_1.MongooseModule.forFeature([
                { name: mongo_1.DNASequenceMongo.name, schema: mongo_1.DNASequenceSchema },
                { name: Stats_schema_1.StatsSequencesMongo.name, schema: Stats_schema_1.StatsSequencesSchema }
            ]),
            typeorm_1.TypeOrmModule.forFeature([repositoriesPostgreSQL_1.SequenceDNARepository]),
            config_1.ConfigModule,
        ],
        controllers: [stats_controller_1.StatsController],
        providers: [repositoriesMongoDB_1.DNASequenceMongoRepository, repositoriesMongoDB_1.StatsMongoReqpository, stats_service_1.StatsService],
        exports: [stats_service_1.StatsService],
    })
], StatsModule);
exports.StatsModule = StatsModule;
//# sourceMappingURL=stats.module.js.map