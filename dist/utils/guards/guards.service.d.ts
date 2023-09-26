import { RedisService } from "../../configurations/redis/redis.service";
export declare class GuardsService {
    private readonly redis;
    constructor(redis: RedisService);
    validateAccess: (token: string, user: string) => Promise<Boolean>;
    validateRefresh: (token: string, user: string) => Promise<Boolean>;
    validateSignToken: (token: string, member: string) => Promise<boolean>;
}
