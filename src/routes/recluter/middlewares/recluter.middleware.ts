import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CatchMatriz, ComponentDNAValidation, ComponentesCharacterDNAValidation, ContexValidationStrategy, DiagonalLeftRigthCatch, DiagonalRigthLeftCatch, DimensionSepDNAValidation, VerticalCatch } from './usesCases';
import { FormatterToArray2dFromArrayString } from 'src/utils/formater';
import {ISequence} from '../interfaces/sequence.interface';

@Injectable()
export class RecluterSequenceDNAMiddleware implements NestMiddleware {
 async use(req: Request, _res: Response, next: NextFunction) {
    const {dna}:ISequence  = req.body;
    
    /**
     * Strategy Design Pattern
     * to create multiple validation of "Letter soup" 
     * Matriz DNA
     */
    const contextValidation = new ContexValidationStrategy()
    
    const initialValidations = [
         /** Validation Dimension NxN  exists using ComponentDNAValidation Strategy */
         contextValidation.executeValidation(DimensionSepDNAValidation, [dna]),

         /** Validation Correct Characters DNA component exists using ComponentDNAValidation Strategy */
         contextValidation.executeValidation(ComponentesCharacterDNAValidation, [dna]),
    ];
   await Promise.all(initialValidations)
    .catch((err) => next(err))

    /** format */
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


   const validations = [
        /** Validation All posiblo position by Factory Matriz exists using ComponentDNAValidation Strategy */
        contextValidation.executeValidation(ComponentDNAValidation, [arrLR,arrRL,arrV,dna]),
    ]
    return Promise.all(validations)
    .then(() => next())
    .catch((err) => next(err))
  }
}
