import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateInsuranceDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;
    @ApiProperty({example: "International Health", description: "Insurance company name"})
    @IsNotEmpty()
    @IsString()
    insuranceCompany: string;
    @ApiProperty({example: "123456789", description: "Insurance number"})
    @IsNotEmpty()
    @IsString()
    insuranceNumber: string;
    @ApiProperty({example: 100000, description: "Amount covered by the insurance"})
    @IsNotEmpty()
    @IsNumber()
    amountCovered: number;
    @ApiProperty({example: "2023-12-31", description: "Expiration date of the insurance"})
    @IsNotEmpty()   
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Expiration date must be in format YYYY-MM-DD' })
    expirationDate: string;
}
