import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty, IsNumber,IsString } from "class-validator"

export class CreatePrescriptionDto {
    @IsNotEmpty()
    @IsNumber()
    medicalRecordId: number;
    @IsNotEmpty()
    @IsNumber()
    medicationId: number;
    @ApiProperty({ example: 50, description: "Dosage of the medication" })
    @IsNumber()
    @IsNotEmpty()
    dosage: number;
    @ApiProperty({ example: "twice a day", description: "Frequency of the medication" })
    @IsNotEmpty()
    @IsString()
    frequency: string;
    @ApiProperty({ example: "7 days", description: "Duration of the medication" })
    @IsNotEmpty()
    @IsString()
    duration: string;
}
