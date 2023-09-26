import { Test, TestingModule } from "@nestjs/testing";
import { RecluterSequenceDNAMiddleware } from "src/routes/recluter/middlewares/recluter.middleware";
import { Request, Response, NextFunction } from 'express';
import { StatsService } from "src/routes/stats/stats.service";
import { ComponentDNAValidation } from "src/routes/recluter/middlewares/usesCases";
import { ExceptionsService } from "src/configurations/exceptions";

describe('RecluterSequenceDNAMiddleware', () => {
    let middleware: RecluterSequenceDNAMiddleware;
    let componentValidationUseCases: ComponentDNAValidation


  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
              RecluterSequenceDNAMiddleware,
              ComponentDNAValidation,
              ExceptionsService,
              {
                provide: StatsService,
                useValue: {
                    upsertStat: jest.fn(),
                    getStats: jest.fn()
                }
              },
            ],
          }).compile();
  
      middleware = module.get<RecluterSequenceDNAMiddleware>(
        RecluterSequenceDNAMiddleware,
      );
      componentValidationUseCases = module.get<ComponentDNAValidation>(ComponentDNAValidation)
    });
  
    it('should be defined', () => {
      expect(middleware).toBeDefined();
    });
  
    it('should call typeDNAValidation', async () => {
      const dataSend = [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
      ]
      const req = { body: { dna: dataSend } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;
  
      await middleware.use(req, res, next);

      jest.spyOn(componentValidationUseCases, 'typeDNAValidation')

      await expect(componentValidationUseCases.typeDNAValidation([dataSend], () => null)).resolves.toBeUndefined
      expect(componentValidationUseCases.typeDNAValidation).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalled();
    });

  });