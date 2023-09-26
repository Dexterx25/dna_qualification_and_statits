"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecluterModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const recluter_controller_1 = require("./recluter.controller");
const recluter_service_1 = require("./recluter.service");
const middlewares_1 = require("./middlewares");
const repositoriesPostgreSQL_1 = require("../../database/repositoriesPostgreSQL");
const exceptions_1 = require("../../configurations/exceptions");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_1 = require("../../database/mongo");
const repositoriesMongoDB_1 = require("../../database/repositoriesMongoDB");
const stats_service_1 = require("../stats/stats.service");
const Stats_schema_1 = require("../../database/mongo/schemas/Stats.schema");
const usesCases_1 = require("./middlewares/usesCases");
const uses_cases_modulse_1 = require("./middlewares/usesCases/uses_cases.modulse");
const recluter_initials_middleware_1 = require("./middlewares/recluter.initials.middleware");
let RecluterModule = class RecluterModule {
    configure(consumer) {
        consumer
            .apply(recluter_initials_middleware_1.RecluterSequenceDNAFormatValidations)
            .forRoutes({ path: 'api/v1/mutant', method: common_1.RequestMethod.POST });
        consumer
            .apply(middlewares_1.RecluterSequenceDNAMiddleware)
            .forRoutes({ path: 'api/v1/mutant', method: common_1.RequestMethod.POST });
    }
};
RecluterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mongo_1.DNASequenceMongo.name, schema: mongo_1.DNASequenceSchema },
                { name: Stats_schema_1.StatsSequencesMongo.name, schema: Stats_schema_1.StatsSequencesSchema }
            ]),
            typeorm_1.TypeOrmModule.forFeature([repositoriesPostgreSQL_1.SequenceDNARepository]),
            exceptions_1.ExceptionsModule,
            config_1.ConfigModule,
        ],
        controllers: [recluter_controller_1.RecluterController],
        providers: [
            repositoriesMongoDB_1.DNASequenceMongoRepository,
            usesCases_1.ComponentDNAValidation,
            recluter_service_1.RecluterService,
            uses_cases_modulse_1.UsesCasesModule,
            stats_service_1.StatsService,
            repositoriesMongoDB_1.StatsMongoReqpository
        ],
        exports: [recluter_service_1.RecluterService],
    })
], RecluterModule);
exports.RecluterModule = RecluterModule;
//# sourceMappingURL=recluter.module.js.map