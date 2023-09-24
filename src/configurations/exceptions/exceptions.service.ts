import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export interface IFormatExceptionMessage {
  statusCode?: number;
  message: string;
  error?: boolean;
}

@Injectable()
export class ExceptionsService {
  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException({...data, error: true});
  }
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException({...data, error: true});
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException({...data, error: true});
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException({...data, error: true});
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException({...data, error: true});
  }
  conflicException(data?: IFormatExceptionMessage): void {
    throw new ConflictException({...data, error: true});
  }
}
