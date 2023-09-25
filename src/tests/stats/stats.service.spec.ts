import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from 'src/routes/stats/stats.service';
import { getModelToken } from '@nestjs/mongoose';;
import { Model } from 'mongoose';
import { StatsSequencesMongo  } from 'src/database/mongo/schemas/Stats.schema';
import { StatsMongoReqpository } from 'src/database/repositoriesMongoDB';
import { IStats } from 'src/routes/stats/interfaces';

describe('BookService', () => {
  let bookService: StatsService;
  let model: Model<StatsSequencesMongo>;

  const mockDNA = {
    "_id": "65119b8993351ef818dca30c",
    "ratio": 3,
    "count_human_dna": 1,
    "count_mutant_dna": 3,
    "id": 1,
    "createdAt": "2023-09-25T14:39:05.011Z",
    "updatedAt": "2023-09-25T16:38:50.770Z"
  }

  const statMockedRepository = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    getStats: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        StatsMongoReqpository,
        {
          provide: getModelToken(StatsSequencesMongo.name),
          useValue: statMockedRepository,
        },
      ],
    }).compile();

    bookService = module.get<StatsService>(StatsService);
    model = module.get<Model<StatsSequencesMongo>>(getModelToken(StatsSequencesMongo.name));
  });

  describe('create human stat', () => {
    it('should create ', async () => {
      const stat: IStats = {
        count_human_dna: 1,
        id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID)
    };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockDNA));
  
      const result = await bookService.upsertStat(stat)
      expect(result).toEqual(void 0);
    });
  });

  describe('create mutant stat', () => {
    it('should create ', async () => {
      const stat: IStats = {
        count_human_dna: 1,
        id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID)
    };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockDNA));
      
      const result = await bookService.upsertStat(stat)
      expect(result).toEqual(void 0);
    });
  });


});