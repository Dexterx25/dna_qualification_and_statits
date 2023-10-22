  import { ApiProperty } from "@nestjs/swagger";
import {
    IsDecimal,
    IsNotEmpty,
    IsNumber,
  } from "class-validator";
import { IStats } from "../../interfaces";
 
  export class StatsDTO implements IStats {
    @ApiProperty({
        type: Number,
        example: 40,
        nullable: false,
        required: true,
        description: 'Counter mutant dna within system'
      })
    @IsNotEmpty()
    @IsNumber()
    count_mutant_dna!: number;
  
    @ApiProperty({
        type: Number,
        example: 100,
        nullable: false,
        required: true,
        description: 'Counter human dna within system'
      })
    @IsNotEmpty()
    @IsNumber()
    count_human_dna!: number;

    @ApiProperty({
        type: Number,
        example: 0.4,
        nullable: false,
        required: true,
        description: 'Ratio relation between both counters'
      })
    @IsNotEmpty()
    @IsDecimal()
    @IsNumber()
    ratio!: number;
  
  }
