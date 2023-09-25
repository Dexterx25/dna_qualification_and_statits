import { StatsSequencesModel, StatsSequencesMongo, StatsSequencesDocument } from '../mongo/schemas/Stats.schema';
import { FilterQuery } from 'mongoose';
import { IStats } from 'src/routes/stats/interfaces';
export declare class StatsMongoReqpository {
    private readonly statModel;
    constructor(statModel: StatsSequencesModel);
    create(data: Partial<StatsSequencesMongo>): Promise<StatsSequencesDocument>;
    findOneAndUpdate(userFilterQuery: FilterQuery<StatsSequencesModel>, data: IStats): Promise<StatsSequencesDocument | null>;
    findByCondition(condition: FilterQuery<StatsSequencesModel>): Promise<StatsSequencesDocument | null>;
}
