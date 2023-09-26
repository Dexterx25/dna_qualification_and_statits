import { DNASequenceModel, DNASequenceMongo } from '../mongo/schemas/DNA.schema';
import { ISequenceFormated } from 'src/routes/recluter/interfaces';
import { FilterQuery } from 'mongoose';
export declare class DNASequenceMongoRepository {
    private readonly dnaModel;
    constructor(dnaModel: DNASequenceModel);
    create(user: ISequenceFormated): Promise<DNASequenceMongo>;
    findAll(): Promise<DNASequenceMongo[]>;
    findById(id: string): Promise<DNASequenceMongo | null>;
    findOneByDNA({ dna }: ISequenceFormated): Promise<DNASequenceMongo | null>;
    findByCondition(condition: FilterQuery<DNASequenceModel>): Promise<DNASequenceMongo | null>;
}
