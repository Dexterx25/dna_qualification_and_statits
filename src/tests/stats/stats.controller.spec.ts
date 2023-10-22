import { Test, TestingModule } from "@nestjs/testing";
import { StatsSequencesMongo } from "src/dataAccess/databases/mongodb/schemas/Stats.schema";
import { StatsMongoReqpository } from "src/dataAccess/databases/mongodb/repositories";
import { StatsController } from "src/modules/stats/stats.controller";
import { StatsService } from "src/modules/stats/stats.service";


describe('StatsController', () => {
    let controller: StatsController;
    let statsService: StatsService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [StatsController],
        providers: [  {
          provide: StatsMongoReqpository,
          useValue: {
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            findByCondition: jest.fn(),
          },
        }, StatsService],
      }).compile();
  
      controller = module.get<StatsController>(StatsController);
      statsService = module.get<StatsService>(StatsService);
    });
  
    describe('getStat', () => {
      it('should return a Stats object', async () => {
        const expectedStats: StatsSequencesMongo = {
            id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID),
            count_human_dna: 60,
            count_mutant_dna: 70,
            ratio: 1.16
          }
          
        jest.spyOn(statsService, 'getStats').mockResolvedValue(expectedStats);
  
        const result = await controller.getStat();
  
        expect(result).toEqual(expectedStats);
      });
    });
  });