import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecluterController } from './recluter.controller';
import { RecluterService } from './recluter.service';
import { RecluterSequenceDNAMiddleware } from './middlewares';
import { SequenceDNARepository } from 'src/database/repositoriesPostgreSQL';
import { ExceptionsModule } from 'src/configurations/exceptions';
import { MongooseModule } from '@nestjs/mongoose';
import { DNASequenceMongo, DNASequenceSchema } from 'src/database/mongo';
import { DNASequenceMongoRepository, StatsMongoReqpository } from 'src/database/repositoriesMongoDB';
import { StatsService } from '../stats/stats.service';
import { StatsSequencesMongo, StatsSequencesSchema } from '../../database/mongo/schemas/Stats.schema'
import { ComponentDNAValidation } from './middlewares/usesCases';
import { UsesCasesModule } from './middlewares/usesCases/uses_cases.modulse';
import { RecluterSequenceDNAFormatValidations } from './middlewares/recluter.initials.middleware';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: DNASequenceMongo.name, schema: DNASequenceSchema },
        { name: StatsSequencesMongo.name, schema: StatsSequencesSchema }
      ]),
    TypeOrmModule.forFeature([SequenceDNARepository]),
    ExceptionsModule, 
    ConfigModule,
  ],
  controllers: [RecluterController],
  providers: [
    DNASequenceMongoRepository, 
    ComponentDNAValidation, 
    RecluterService, 
    UsesCasesModule,
    StatsService, 
    StatsMongoReqpository],
  exports: [RecluterService],
})
export class RecluterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RecluterSequenceDNAFormatValidations)
    .forRoutes({path: 'api/v1/mutant', method: RequestMethod.POST})
    consumer
    .apply(RecluterSequenceDNAMiddleware)
    .forRoutes({path: 'api/v1/mutant', method: RequestMethod.POST})
  }
}