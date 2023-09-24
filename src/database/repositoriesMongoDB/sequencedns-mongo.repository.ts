import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DNASequenceModel, DNASequenceDocument, DNASequenceMongo } from '../mongo/schemas/DNA.schema'
import { ISequenceFormated } from 'src/routes/recluter/interfaces';
import { FilterQuery } from 'mongoose';

@Injectable()
export class DNASequenceMongoRepository {
  constructor(@InjectModel(DNASequenceMongo.name) private readonly dnaModel: DNASequenceModel) {}

  async create(user: ISequenceFormated): Promise<DNASequenceDocument> {
    const createdUser = new this.dnaModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<DNASequenceDocument[]> {
    return this.dnaModel.find().exec();
  }

  async findById(id: string): Promise<DNASequenceDocument|null> {
    return this.dnaModel.findById(id).exec();
  }
  async findOneByDNA({dna}: ISequenceFormated ): Promise<DNASequenceDocument|null> {
    return this.dnaModel.findOne({dna}).exec();
  }

  async findByCondition(condition: FilterQuery<DNASequenceModel>): Promise<DNASequenceDocument|null> {
    return this.dnaModel.findOne(condition).exec();
  }

}