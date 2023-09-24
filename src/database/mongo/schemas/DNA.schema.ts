import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Schema({ timestamps: true, versionKey: false })
export class DNASequenceMongo  {

  
    @Prop({ type: String, required: false })
    dna!: string;

  }


export type DNASequenceDocument = DNASequenceMongo & Document;

export const UserSchema = SchemaFactory.createForClass(DNASequenceMongo);

export type DNASequenceModel = Model<DNASequenceDocument>;
  