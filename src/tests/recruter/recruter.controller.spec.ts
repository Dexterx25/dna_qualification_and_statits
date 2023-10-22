import { Test, TestingModule } from '@nestjs/testing';
import { RecluterController } from 'src/modules/recluter/recluter.controller';
import { RecluterService } from 'src/modules/recluter/recluter.service';
import { StatsService } from 'src/modules/stats/stats.service';
import { ExceptionsService } from 'src/configurations/exceptions';
import { DNASequenceMongo } from 'src/dataAccess/databases/mongodb';
import { RecluterSequenceDNAMiddleware } from 'src/modules/recluter/middlewares';
import { ComponentDNAValidation } from 'src/modules/recluter/middlewares/usesCases';
import { BadRequestException } from '@nestjs/common';

describe('RecluterController', () => {
  let recluterService: RecluterService;
  let statsService: StatsService;
  let recluterController: RecluterController;

  const relcuterMock = {
    "_id": "65119b8893351ef818dca309",
    "dna": "[\"ATGCGA\",\"CAGTGC\",\"TTATGT\",\"AGAAGG\",\"CCCCTA\",\"CGTCGT\"]",
    "createdAt": "2023-09-25T14:39:04.995Z",
    "updatedAt": "2023-09-25T14:39:04.995Z"
  };
  const mockrecluterService = {
    getSequenceBySequenceSTR: jest.fn(),
    postSequence: jest.fn(),
    };

  const mockStatsService = {
    upsertStat: jest.fn(),
    getStats: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecluterController],
      providers: [
        ExceptionsService,
        RecluterSequenceDNAMiddleware,
        {
            provide: ComponentDNAValidation,
            useValue: ComponentDNAValidation
        },
        {
         provide: StatsService,
         useValue: mockStatsService,
        },
        {
          provide: RecluterService,
          useValue: mockrecluterService,
        },
      ],
    }).compile();

    recluterController = module.get<RecluterController>(RecluterController);
    recluterService = module.get<RecluterService>(RecluterService);
    statsService =  module.get<StatsService>(StatsService);
  });

  it('should be defined controler save sequence', () => {
    expect(recluterController).toBeDefined();
  });

  describe('save sequence', () => {
    it('should save sequence DNA', async () => {
      const newRecluter = {
        dna:['ads']
      };

      recluterService.postSequence = jest.fn().mockResolvedValueOnce(relcuterMock);
      recluterService.getSequenceBySequenceSTR = jest.fn().mockResolvedValueOnce(null);
      const spyUpsertStat = jest.spyOn(statsService, 'upsertStat')
      const result: DNASequenceMongo = await recluterController.postSequence(newRecluter);

      expect(recluterService.postSequence).toHaveBeenCalled();
      expect(spyUpsertStat).toHaveBeenCalledTimes(1)
      expect(recluterService.postSequence).toHaveBeenCalledTimes(1);
      expect(result).toEqual(relcuterMock);
    });
  });

  describe('sequence already exists', () => {
    it('should trigger error already exists data', async () => {
      const newRecluter = {
        dna:['ads', 'asd']
      };

      recluterService.postSequence = jest.fn().mockResolvedValueOnce(relcuterMock);
      recluterService.getSequenceBySequenceSTR = jest.fn().mockResolvedValueOnce(relcuterMock);

      await expect(recluterController.postSequence(newRecluter)).rejects.toThrowError(BadRequestException)
      expect(recluterService.postSequence).toBeCalledTimes(0);
      expect(recluterService.getSequenceBySequenceSTR).toBeCalledTimes(1);

    });
  });

});