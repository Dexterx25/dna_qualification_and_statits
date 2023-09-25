import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ComponentDNAValidation } from './usesCases';
export declare class RecluterSequenceDNAFormatValidations implements NestMiddleware {
    private readonly componentValidation;
    constructor(componentValidation: ComponentDNAValidation);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
