import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ComponentDNAValidation } from './usesCases';
import {ISequence} from '../interfaces/sequence.interface';

@Injectable()
export class RecluterSequenceDNAFormatValidations implements NestMiddleware {
     constructor(
          private readonly componentValidation: ComponentDNAValidation
      ) {}
   async use(req: Request, _res: Response, next: NextFunction) {
    const {dna}:ISequence  = req.body;

    const initialValidations = [
         this.componentValidation.dimensionValidation([dna]),
         this.componentValidation.enableComponentesValidation([dna]),
    ];
    return Promise.all(initialValidations)
       .then(() => next())
       .catch((err) =>next(err))
  }
}
