import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecluterController } from './recluter.controller';
import { RecluterService } from './recluter.service';
import { RecluterSequenceDNAMiddleware } from './middlewares';
import { ExceptionsService } from 'src/configurations/exceptions';
import { DNA } from 'src/database/postgreSQL';
import { SequenceDNARepository } from 'src/database/repositoriesPostgreSQL';

@Module({
  controllers: [RecluterController],
  imports: [TypeOrmModule.forFeature([DNA]), ConfigModule],
  providers: [RecluterService, ExceptionsService, SequenceDNARepository],
  exports: [RecluterService],
})
export class RecluterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RecluterSequenceDNAMiddleware)
    .forRoutes({path: 'api/v1/mutant', method: RequestMethod.POST})
  }
}