import { DNASequenceModel, DNASequenceDocument } from '../mongo/schemas/DNA.schema';
import { ISequenceFormated } from 'src/routes/recluter/interfaces';
import { FilterQuery } from 'mongoose';
export declare class DNASequenceMongoRepository {
    private readonly dnaModel;
    constructor(dnaModel: DNASequenceModel);
    create(user: ISequenceFormated): Promise<DNASequenceDocument>;
    findAll(): Promise<DNASequenceDocument[]>;
    findById(id: string): Promise<DNASequenceDocument | null>;
    findOneByDNA({ dna }: ISequenceFormated): Promise<DNASequenceDocument | null>;
    findByCondition(condition: FilterQuery<DNASequenceModel>): Promise<DNASequenceDocument | null>;
}
