import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStats } from 'src/modules/stats/interfaces';

@Schema({  timestamps: true, versionKey: false})
export class StatsSequencesMongo implements IStats  {
    @Prop({type: Number, required: true, unique: true})
    id!: number;

    @Prop({ type: Number, default: 0 })
    count_mutant_dna!: number;

    @Prop({ type: Number, default: 0 })
    count_human_dna!: number;
  
    @Prop({ type: Number, default: 0})
    ratio!: number;

  }


export type StatsSequencesDocument = StatsSequencesMongo & Document;

export const StatsSequencesSchema = SchemaFactory.createForClass(StatsSequencesMongo);

export type StatsSequencesModel = Model<StatsSequencesDocument>;
  