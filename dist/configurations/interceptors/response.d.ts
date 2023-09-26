import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseFormat<T> {
    duration: string;
    method: string;
    status: number;
    data: T;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>>;
}
