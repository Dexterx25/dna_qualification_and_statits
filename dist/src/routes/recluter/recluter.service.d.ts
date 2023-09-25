import { ISequence } from "./interfaces/sequence.interface";
import { DNASequenceMongoRepository } from 'src/database/repositoriesMongoDB';
import { DNASequenceDocument } from "src/database/mongo";
export declare class RecluterService {
    private readonly sequenceRepository;
    constructor(sequenceRepository: DNASequenceMongoRepository);
    postSequence(dnaData: ISequence): Promise<void>;
    getSequenceBySequenceSTR({ dna }: ISequence): Promise<DNASequenceDocument | null>;
}
