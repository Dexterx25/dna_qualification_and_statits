import { Model } from 'mongoose';
export declare class DNASequenceMongo {
    dna: string;
}
export declare type DNASequenceDocument = DNASequenceMongo & Document;
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<DNASequenceMongo, any, any>, Model<import("mongoose").Document<DNASequenceMongo, any, any>, any, any>, undefined, {}>;
export declare type DNASequenceModel = Model<DNASequenceDocument>;
