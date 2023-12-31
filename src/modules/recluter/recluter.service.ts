import { Injectable } from "@nestjs/common";
import {ISequence} from "./interfaces/sequence.interface";
//import { SequenceDNARepository } from "src/database/repositoriesPostgreSQL";
import {DNASequenceMongoRepository} from 'src/dataAccess/databases/mongodb/repositories'
//import { DNA } from "src/database/postgreSQL";
import { DNASequenceMongo } from "src/dataAccess/databases/mongodb";

@Injectable()
export class RecluterService {
  constructor(
    private readonly sequenceRepository: DNASequenceMongoRepository,
  ) {}
  // public async postSequence(
  //    dnaData: ISequence
  //   ): Promise<void> {
  //     await this.sequenceRepository.create({dna: JSON.stringify(dnaData.dna)})
  // };  

  // public async getSequenceBySequenceSTR(
  //   {dna}: ISequence
  // ): Promise<DNA | undefined>{
  //   return await this.sequenceRepository.findOne({dna: JSON.stringify(dna)})
  // }
  public async postSequence(
    dnaData: ISequence
   ): Promise<DNASequenceMongo> {
     return await this.sequenceRepository.create({dna: JSON.stringify(dnaData.dna)})
 };  

 public async getSequenceBySequenceSTR(
   {dna}: ISequence
 ): Promise<DNASequenceMongo | null>{
   return await this.sequenceRepository.findOneByDNA({dna: JSON.stringify(dna)})
 }
};

