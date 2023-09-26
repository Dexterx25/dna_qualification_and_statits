import { Test, TestingModule } from "@nestjs/testing";
import { RecluterSequenceDNAFormatValidations } from "src/routes/recluter/middlewares/recluter.initials.middleware";
import { ComponentDNAValidation } from "src/routes/recluter/middlewares/usesCases";
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@nestjs/common';
import { StatsService } from "src/routes/stats/stats.service";
import { ExceptionsService } from "src/configurations/exceptions";


describe('RecluterSequenceDNAFormatValidations', () => {
    let middleware: RecluterSequenceDNAFormatValidations;
    let componentValidationUseCases: ComponentDNAValidation

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RecluterSequenceDNAFormatValidations,
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
  
      middleware = module.get<RecluterSequenceDNAFormatValidations>(
        RecluterSequenceDNAFormatValidations,
      );
      componentValidationUseCases = module.get<ComponentDNAValidation>(ComponentDNAValidation)
    });
  
    it('should be defined', () => {
      expect(middleware).toBeDefined();
    });


    it('should call dimensionValidation error dimension not NxN', async () => {
        const dataSend = [
          "ATGCGA",
          "CAGTGC",
          "TTATGTA",
          "AGAAGG",
          "CCCCTA",
          "TCACTG"
        ]

        const req = { body: { dna: dataSend } } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
    
        await middleware.use(req, res, next);
        await expect(componentValidationUseCases.dimensionValidation([dataSend])).rejects.toThrowError(BadRequestException)
        expect(next).toHaveBeenCalled();
      });

    it('should call enableComponentesValidation error error component not available', async () => {
         const dataSend = [
           "ATGCGA",
           "CAGTGC",
           "TTATGX", // <--- add x not available to be a DNA (probably alien haha)
           "AGAAGG",
           "CCCCTA",
           "TCACTG"
         ]
        
         const req = { body: { dna: dataSend } } as Request;
         const res = {} as Response;
         const next = jest.fn() as NextFunction;
         jest.spyOn(componentValidationUseCases, 'typeDNAValidation')

         await middleware.use(req, res, next);
         await expect(componentValidationUseCases.enableComponentesValidation([dataSend])).rejects.toThrowError(BadRequestException)
         expect(componentValidationUseCases.typeDNAValidation).toHaveBeenCalledTimes(0);

         expect(next).toHaveBeenCalled();
     });

     it('should call enableComponentesValidation dimensionValidation everything is fine!', async () => {
        const dataSend = [
          "ATGCGA",
          "CAGTGC",
          "TTATGA", 
          "AGAAGG",
          "CCCCTA",
          "TCACTG"
        ]
       
        const req = { body: { dna: dataSend } } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
   
        jest.spyOn(componentValidationUseCases, 'typeDNAValidation')

        await middleware.use(req, res, next);
        await expect(componentValidationUseCases.enableComponentesValidation([dataSend])).resolves.toBeUndefined
        await expect(componentValidationUseCases.dimensionValidation([dataSend])).resolves.toBeUndefined
        expect(componentValidationUseCases.typeDNAValidation).toHaveBeenCalledTimes(0);

        expect(next).toHaveBeenCalled();
    });
  });