import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail,IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Alieva", description: "Name of admin" })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: "example@gmail.com", description: "Email of admin" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: "+998939171474", description: "Number of admin" })
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone_number: string;
  @ApiProperty({ example: "Alieva007@001", description: "Password of admin" })
  @IsNotEmpty()
  @IsString()
  hashed_password: string;
  @ApiProperty({ example: "admin", description: "Super or not" })
  @IsNotEmpty()
  @IsString()
  role: string;
}
