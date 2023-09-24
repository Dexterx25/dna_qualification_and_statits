import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsNotEmpty, IsOptional, IsUUID,
  } from "class-validator";
 

  export class MemberOutPutDTO {
    @IsUUID()
    @ApiProperty({
      type: String,
    })
    memberId!: string;

    @IsUUID()
    @ApiProperty({
      type: String,
    })
    userId!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    email!: string;

    @IsOptional()
    @ApiProperty({
      type: String,
    })
    full_name!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    nikename!: string;
   

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    names!: string;
   
    
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    lastnames!: string;
   
  
  }

 
