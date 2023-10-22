import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CatchMatriz, ComponentDNAValidation, DiagonalLeftRigthCatch, DiagonalRigthLeftCatch, VerticalCatch } from './usesCases';
import { FormatterToArray2dFromArrayString } from 'src/utils/formater';
import {ISequence} from '../interfaces/sequence.interface';
import { StatsService } from 'src/modules/stats/stats.service';
import { IStats } from 'src/modules/stats/interfaces';

@Injectable()
export class RecluterSequenceDNAMiddleware implements NestMiddleware {
     constructor(
          private readonly statsService : StatsService,
          private readonly componentValidation: ComponentDNAValidation
          ) {}
   async use(req: Request, _res: Response, next: NextFunction) {
    const {dna}:ISequence  = req.body;

    const matriz: string[][] =  FormatterToArray2dFromArrayString(dna)

    /**
     * Use Factory Pattern Disign to create multiple new 
     * matriz 2D using matriz original 2D. 
     * 
     * Creation Patter because we need to create new multiple matriz
     * for orientation validation and if we need to implement new filters to validate
     * we just EXTEND a new Matriz without Affect exists code (Modification) and 
     * assign a unique responsebility concret factorty
     * 
     * SOLID objetives: Single Responsability, Open Close
     * 
     * 1. Diagonal elements LeftRigth orientation: DiagonalLeftRigthCatch
     * 2. Diagonal elements RigthLeft orientation: DiagonalLeftRigthCatch
     * 3. Vertical elements Descendent orientation: VerticalCatch
     */
    const instanceArrLR: CatchMatriz = new DiagonalLeftRigthCatch()
    const instanceArrRL: CatchMatriz = new DiagonalRigthLeftCatch()
    const instanceArrV: CatchMatriz = new VerticalCatch()
    
    /**
     * Return array 1D formated for each type orientation of original
     * Matriz 2D to send our validation sequence componentes DNA
     */
    const arrLR = instanceArrLR.execute(matriz).arr
    const arrRL = instanceArrRL.execute(matriz).arr
    const arrV = instanceArrV.execute(matriz).arr

    /**
     * statsCallBack to assign in Statistics collection
     * counter humman and mutants
     */
    let dataStatToSave: IStats
    function statsCallBack (dataStats: IStats): void {
     dataStatToSave= dataStats
    }

   const validations = [
        this.componentValidation.typeDNAValidation([arrLR,arrRL,arrV,dna], statsCallBack),
    ]
    
    return Promise.all(validations)
    .then(() => next())
    .catch((err) =>next(err))
    .finally(async() => {if (dataStatToSave) await this.statsService.upsertStat(dataStatToSave)})
  }
}
