import { ConfigService } from '@nestjs/config';
export declare class RedisService {
    private readonly logger;
    private tedis;
    constructor(config: ConfigService);
    private generateSessionKey;
    getSessionValue: (type: string, key: string) => Promise<string | number | null>;
    setSessionValue: (type: string, id: string, token: string, expiredAt: number) => Promise<void>;
    deleteSessionValue: (id: string) => Promise<void>;
    deleteKey: (key: string) => Promise<void>;
    existsKey: (type: string, key: string) => Promise<number>;
}
