import { Injectable } from "@nestjs/common";
import {ISequence} from "./interfaces/sequence.interface";
import { SequenceDNARepository } from "src/database/repositoriesPostgreSQL";
import { DNA } from "src/database/postgreSQL";

@Injectable()
export class RecluterService {
  constructor(
    private readonly sequenceRepository: SequenceDNARepository,
  ) {}
  public async postSequence(
     dnaData: ISequence
    ): Promise<void> {
      await this.sequenceRepository.create({dna: JSON.stringify(dnaData.dna)})
  };  

  public async getSequenceBySequenceSTR(
    {dna}: ISequence
  ): Promise<DNA | null>{
    return await this.sequenceRepository.findOneBy({dna: JSON.stringify(dna)})
  }
};

