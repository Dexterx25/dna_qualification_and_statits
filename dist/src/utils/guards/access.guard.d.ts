import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AccessGuard implements CanActivate {
    private readonly config;
    constructor(config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
