import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from 'src/routes/stats/stats.service';
import { getModelToken } from '@nestjs/mongoose';;
import { StatsSequencesMongo  } from 'src/database/mongo/schemas/Stats.schema';
import { StatsMongoReqpository } from 'src/database/repositoriesMongoDB';
import { Model } from 'mongoose';

describe('statService', () => {
  let statService: StatsService;
  let statsRepository: StatsMongoReqpository;
  let statModel = Model<StatsSequencesMongo>

  afterEach(() => {    
    jest.clearAllMocks();
  });

  const statModelMoked = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getModelToken(StatsSequencesMongo.name),
          useValue: statModelMoked,
        },
        {
          provide: StatsMongoReqpository,
          useValue: {
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            findByCondition: jest.fn(),
          },
        },
      ],
    }).compile();

    statService = module.get<StatsService>(StatsService);
    statsRepository = module.get<StatsMongoReqpository>(StatsMongoReqpository)
    statModel = module.get<Model<StatsSequencesMongo>>(getModelToken(StatsSequencesMongo.name));
  });

  describe('upsertStat', () => {

      it('should update an existing stat', async () => {
        const testData = {
          id: 1,
          count_human_dna: 2,
          count_mutant_dna: 3,
        };

        const existingStat = {
          id: 1,
          count_human_dna: 1,
          count_mutant_dna: 2,
        };

        (statsRepository.findByCondition as jest.Mock).mockResolvedValue(existingStat);

        await statService.upsertStat(testData);
        
        const new_human_count = (testData.count_human_dna || 0) + existingStat.count_human_dna;
        const new_mutant_count = (testData.count_mutant_dna || 0) + existingStat.count_mutant_dna;

        expect(statsRepository.findOneAndUpdate).toHaveBeenCalledWith({ id: testData.id }, {
          id: testData.id,
          count_human_dna: new_human_count,
          count_mutant_dna: new_mutant_count,
          ratio: new_mutant_count / new_human_count,
        });
      });
  })

  describe('getStats', () => {
    it('should get stats by id', async () => {
      const id = 1;
      const expectedStat = {
        id,
        count_human_dna: 2,
        count_mutant_dna: 3,
      };

      (statsRepository.findByCondition as jest.Mock).mockResolvedValue(expectedStat);

      const result = await statService.getStats(id);

      expect(result).toEqual(expectedStat);
    });

    it('should return null if stat not found', async () => {
      const id = 1;

      (statsRepository.findByCondition as jest.Mock).mockResolvedValue(null);

      const result = await statService.getStats(id);

      expect(result).toBeNull();
    });
  });

   describe('createStat', () => {
    it('create stat if not exists', async () => {
      const testData = {
        id: 1,
        count_human_dna: 2,
        count_mutant_dna: 3,
      };

    

      (statsRepository.findByCondition as jest.Mock).mockResolvedValue(null);
     
      await statService.upsertStat(testData);

      expect(statsRepository.create).toHaveBeenCalledWith(testData);
      expect(statsRepository.findOneAndUpdate).toHaveBeenCalledTimes(0);
      expect(statModel.create).toHaveBeenCalledTimes(0)
    });
   })

});