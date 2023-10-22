import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { SequenceDNARepository } from 'src/dataAccess/databases/postgresql/repositories';
import { ExceptionsModule } from 'src/configurations/exceptions';
import { MongooseModule } from '@nestjs/mongoose';
import { DNASequenceMongo, DNASequenceSchema } from 'src/dataAccess/databases/mongodb';
import { DNASequenceMongoRepository, StatsMongoReqpository } from 'src/dataAccess/databases/mongodb/repositories';
import { StatsSequencesMongo, StatsSequencesSchema } from 'src/dataAccess/databases/mongodb/schemas/Stats.schema';

@Module({
  imports: [
    ExceptionsModule,
    MongooseModule.forFeature([
      { name: DNASequenceMongo.name, schema: DNASequenceSchema },
      { name: StatsSequencesMongo.name, schema: StatsSequencesSchema }

    ]),
    TypeOrmModule.forFeature([SequenceDNARepository]), 
    ConfigModule,
  ],
  controllers: [StatsController],
  providers: [DNASequenceMongoRepository, StatsMongoReqpository, StatsService],
  exports: [StatsService],
})
export class StatsModule {}