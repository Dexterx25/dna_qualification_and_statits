import { ISequence } from "./interfaces/sequence.interface";
import { DNASequenceMongoRepository } from 'src/database/repositoriesMongoDB';
import { DNASequenceMongo } from "src/database/mongo";
export declare class RecluterService {
    private readonly sequenceRepository;
    constructor(sequenceRepository: DNASequenceMongoRepository);
    postSequence(dnaData: ISequence): Promise<DNASequenceMongo>;
    getSequenceBySequenceSTR({ dna }: ISequence): Promise<DNASequenceMongo | null>;
}
