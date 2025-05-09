import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateDoctorDto {
    @ApiProperty({example: "Ali", description: "First name of doctor"})
        @IsNotEmpty()
        @IsString()
        first_name: string
        @ApiProperty({example: "Aliev", description: "Last name of doctor"})
        @IsNotEmpty()
        @IsString()
        last_name: string
        @ApiProperty({example: "example@gmail.com", description: "Email of doctor"})
        @IsNotEmpty()
        @IsEmail()
        email: string
        @ApiProperty({example: "Example051111", description: "Password of doctor"})
        @IsNotEmpty()
        @IsStrongPassword()
        password: string
        @ApiProperty({ example: "+998939171474", description: "Number of doctor" })
        @IsNotEmpty()
        @IsPhoneNumber("UZ")
        phone_number: string
        @ApiProperty({ example: "Andijon", description: "Address of doctor" })
        @IsNotEmpty()
        @IsString()
        address: string
        @ApiProperty({ example: "Ishlagan joylari", description: "Bio of doctor" })
        @IsNotEmpty()
        @IsString()
        bio: string
}
