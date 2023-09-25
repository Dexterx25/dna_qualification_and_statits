import { Model } from 'mongoose';
import { IStats } from 'src/routes/stats/interfaces';
export declare class StatsSequencesMongo implements IStats {
    id: number;
    count_mutant_dna: number;
    count_human_dna: number;
    ratio: number;
}
export declare type StatsSequencesDocument = StatsSequencesMongo & Document;
export declare const StatsSequencesSchema: import("mongoose").Schema<import("mongoose").Document<StatsSequencesMongo, any, any>, Model<import("mongoose").Document<StatsSequencesMongo, any, any>, any, any>, undefined, {}>;
export declare type StatsSequencesModel = Model<StatsSequencesDocument>;
