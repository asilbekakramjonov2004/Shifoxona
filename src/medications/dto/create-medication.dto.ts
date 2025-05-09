import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateMedicationDto {
    @ApiProperty({example: "Paracetamol", description: "Name of medication"})
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({example: "Pain relief", description: "Description of medication"})
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty({example: "Nausea, Dizziness", description: "Possible side effects"})
    @IsString()
    @IsNotEmpty()
    side_effects: string;
}
