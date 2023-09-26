import { StatsMongoReqpository } from 'src/database/repositoriesMongoDB';
import { IStats } from "./interfaces";
import { StatsSequencesMongo } from "src/database/mongo/schemas/Stats.schema";
export declare class StatsService {
    private readonly statsRepository;
    constructor(statsRepository: StatsMongoReqpository);
    upsertStat(data: IStats): Promise<void>;
    getStats(id: number): Promise<StatsSequencesMongo | null>;
}
