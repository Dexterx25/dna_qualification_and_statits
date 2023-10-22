import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatsSequencesModel, StatsSequencesMongo, StatsSequencesDocument } from '../schemas/Stats.schema'
import { FilterQuery } from 'mongoose';
import { IStats } from 'src/routes/stats/interfaces';

@Injectable()
export class StatsMongoReqpository {
  constructor(@InjectModel(StatsSequencesMongo.name) private readonly statModel: StatsSequencesModel) {}

  async create(data: Partial<StatsSequencesMongo>): Promise<StatsSequencesDocument> {
    
    const createdData = await this.statModel.create(data);
    return createdData
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<StatsSequencesModel>, 
    data: IStats
    ): Promise<StatsSequencesDocument | null> {
    return this.statModel.findOneAndUpdate(userFilterQuery, data, { new: true });
}

  async findByCondition(condition: FilterQuery<StatsSequencesModel>): Promise<StatsSequencesDocument|null> {
    return this.statModel.findOne(condition)
  }

}