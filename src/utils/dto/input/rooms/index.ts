import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsNotEmpty,
     IsUUID,
  } from "class-validator";
 
  export class UserIdToIntegrateDTO {
    @IsUUID()
    @ApiProperty({
      type: String,
    })
    id!: string;

  }


  export class RoomBodyDTO {
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    name!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: [String],
    })
    members!: string[];

  
  }
