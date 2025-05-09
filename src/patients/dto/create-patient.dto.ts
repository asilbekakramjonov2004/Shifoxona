import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreatePatientDto {
    @ApiProperty({example: "Ali", description: "First name of patient"})
    @IsNotEmpty()
    @IsString()
    first_name: string
    @ApiProperty({example: "Aliev", description: "Last name of patient"})
    @IsNotEmpty()
    @IsString()
    last_name: string
    @ApiProperty({example: "example@gmail.com", description: "Email of patient"})
    @IsNotEmpty()
    @IsEmail()
    email: string
    @ApiProperty({example: "Example051111", description: "Password of patient"})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
    @ApiProperty({ example: "+998939171474", description: "Number of patient" })
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone_number: string
    @ApiProperty({ example: "AA1111111", description: "Passport of patient" })
    @IsNotEmpty()
    @Matches(/^[A-Z]{2}[0-9]{7}$/, { message: 'Passport must be in format AA1234567' })
    passport: string
    @ApiProperty({ example: "Andijon", description: "Address of patient" })
    @IsNotEmpty()
    @IsString()
    address: string
}
