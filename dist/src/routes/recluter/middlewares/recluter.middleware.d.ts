import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ComponentDNAValidation } from './usesCases';
import { StatsService } from 'src/routes/stats/stats.service';
export declare class RecluterSequenceDNAMiddleware implements NestMiddleware {
    private readonly statsService;
    private readonly componentValidation;
    constructor(statsService: StatsService, componentValidation: ComponentDNAValidation);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
