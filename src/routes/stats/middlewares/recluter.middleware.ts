import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class StatsMiddleware implements NestMiddleware {
 async use(_req: Request, _res: Response, next: NextFunction) {
   next()
  }
}
