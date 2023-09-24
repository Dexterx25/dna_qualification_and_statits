import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsNotEmpty, IsOptional, IsUUID,
  } from "class-validator";
 
  export class UserToRegisterDTO {
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


  export class UserDTO {
    @IsUUID()
    @ApiProperty({
      type: String,
    })
    id!: string;

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

 
