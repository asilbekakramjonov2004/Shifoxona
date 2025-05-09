import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateMedicalRecordDto {
    @IsNotEmpty()
    @IsNumber()
    appointmentId: number;

    @ApiProperty({ example: "Good", description: "description of medicalRecords" })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: "Flu", description: "Diagnosis of the patient" })
    @IsNotEmpty()
    @IsString()
    diagnosis: string;
}
