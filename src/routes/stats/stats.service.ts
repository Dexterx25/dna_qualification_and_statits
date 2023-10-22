import { Injectable } from "@nestjs/common";
import {StatsMongoReqpository} from 'src/dataAccess/databases/mongodb/repositories'
import { IStats } from "./interfaces";
import { StatsSequencesMongo } from "src/dataAccess/databases/mongodb/schemas/Stats.schema";

@Injectable()
export class StatsService {
  constructor(
    private readonly statsRepository: StatsMongoReqpository,
  ) {}

  public async upsertStat(data: IStats ): Promise<void>{
    const { id }: IStats = data;
    const statFound: StatsSequencesMongo | null = await this.getStats(id!)
    if(statFound){
      const Modified: IStats = {
        id,
        count_human_dna: (data.count_human_dna || 0) + statFound.count_human_dna,
        count_mutant_dna: (data.count_mutant_dna || 0) + statFound.count_mutant_dna,
      }
      Modified.ratio = Modified.count_mutant_dna! / Modified.count_human_dna!
      await this.statsRepository.findOneAndUpdate({id}, Modified)
    } else {
      await this.statsRepository.create(data)
    }
  }
    

 public async getStats(id: number): Promise<StatsSequencesMongo | null>{
  const dataRetunr: StatsSequencesMongo | null = await this.statsRepository.findByCondition({id})
  return dataRetunr
 }
};

