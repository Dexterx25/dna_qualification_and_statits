import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
      ArrayMinSize,
      IsArray,
    IsNotEmpty,
    IsString
  } from "class-validator";
import {ISequence} from "../../interfaces/index";
 
  export class SequenceDTO {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @ApiProperty({
      type: Array,
      example: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"],
      nullable: false,
      required: true,
      description: 'All data must be ADN data with NxN dimension'
    })
    dna!: ISequence['dna'];
  
  }
