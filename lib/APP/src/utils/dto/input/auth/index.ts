import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsNotEmpty, IsOptional,
  } from "class-validator";
 
  export class registerAdminUserDTO {
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    email!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    password?: string;
  
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    rePassword?: string;

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

 

  export class loginAdminUserDTO {
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    email?: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    password?: string;
  
  
  }

 
