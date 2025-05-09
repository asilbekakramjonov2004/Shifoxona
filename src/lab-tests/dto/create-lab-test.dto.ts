import { ApiProperty } from "@nestjs/swagger"
import {IsDate, IsEmail, IsNotEmpty, isNumber, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateLabTestDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number
    @ApiProperty({example: "Ali", description: "type of lab-test"})
    @IsNotEmpty()
    @IsString()
    test_type: string
    @ApiProperty({example: "Ali", description: "result of lab-tes"})
    @IsNotEmpty()
    @IsString()
    result: string
    @IsNotEmpty()
    @IsNumber()
    doctorId: number
    @IsNotEmpty()
    @IsDate()
    test_date: Date
}
