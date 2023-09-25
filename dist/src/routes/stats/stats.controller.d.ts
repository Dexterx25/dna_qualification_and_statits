import { StatsService } from './stats.service';
import { IStats } from './interfaces';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getStat(): Promise<IStats | null>;
}
