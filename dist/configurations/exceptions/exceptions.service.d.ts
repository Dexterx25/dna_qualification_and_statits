export interface IFormatExceptionMessage {
    statusCode?: number;
    message: string;
    error?: boolean;
}
export declare class ExceptionsService {
    notFoundException(data?: IFormatExceptionMessage): void;
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    unauthorizedException(data?: IFormatExceptionMessage): void;
    conflicException(data?: IFormatExceptionMessage): void;
}
