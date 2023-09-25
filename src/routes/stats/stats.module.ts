import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { SequenceDNARepository } from 'src/database/repositoriesPostgreSQL';
import { ExceptionsModule } from 'src/configurations/exceptions';
import { MongooseModule } from '@nestjs/mongoose';
import { DNASequenceMongo, DNASequenceSchema } from 'src/database/mongo';
import { DNASequenceMongoRepository, StatsMongoReqpository } from 'src/database/repositoriesMongoDB';
import { StatsSequencesMongo, StatsSequencesSchema } from 'src/database/mongo/schemas/Stats.schema';

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