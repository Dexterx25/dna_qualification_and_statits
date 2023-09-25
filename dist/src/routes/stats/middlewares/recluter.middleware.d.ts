import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class StatsMiddleware implements NestMiddleware {
    use(_req: Request, _res: Response, next: NextFunction): Promise<void>;
}
