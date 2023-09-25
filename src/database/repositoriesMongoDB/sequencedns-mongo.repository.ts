import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DNASequenceModel, DNASequenceMongo } from '../mongo/schemas/DNA.schema'
import { ISequenceFormated } from 'src/routes/recluter/interfaces';
import { FilterQuery } from 'mongoose';

@Injectable()
export class DNASequenceMongoRepository {
  constructor(@InjectModel(DNASequenceMongo.name) private readonly dnaModel: DNASequenceModel) {}

  async create(user: ISequenceFormated): Promise<DNASequenceMongo> {
    const createdUser = await this.dnaModel.create(user)
    return createdUser
  }

  async findAll(): Promise<DNASequenceMongo[]> {
    return this.dnaModel.find().exec();
  }

  async findById(id: string): Promise<DNASequenceMongo|null> {
    return await this.dnaModel.findById(id).exec();
  }
  async findOneByDNA({dna}: ISequenceFormated ): Promise<DNASequenceMongo|null> {
    return await this.dnaModel.findOne({dna})
  }

  async findByCondition(condition: FilterQuery<DNASequenceModel>): Promise<DNASequenceMongo|null> {
    return await this.dnaModel.findOne(condition)
  }

}