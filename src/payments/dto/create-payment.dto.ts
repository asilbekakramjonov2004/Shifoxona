import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"
import { Is } from "sequelize-typescript";


export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;
    @IsNotEmpty()
    @IsNumber()
    appointmentId: number;
    @IsNotEmpty()
    @IsNumber()
    insuranceId: number;
    @ApiProperty({ example: 500000, description: "Amount of payment" })
    @IsNotEmpty()
    @IsNumber()
    amount: number;
    @ApiProperty({ example: "credit_card", description: "Payment method" })
    @IsNotEmpty()
    @IsString()
    paymentMethod: string;
    @ApiProperty({ example: "pending", description: "Payment status" })
    @IsNotEmpty()
    @IsString()
    status: string;
}
