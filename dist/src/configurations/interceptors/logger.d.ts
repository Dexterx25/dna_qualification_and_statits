import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../utils/logger';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private getIP;
}
