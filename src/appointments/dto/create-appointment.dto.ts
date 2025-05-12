import { ApiProperty } from "@nestjs/swagger"
import {IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;

    @IsNotEmpty()
    @IsNumber()
    doctorId: number;

    @ApiProperty({example: "2023-01-01T10:00:00Z", description: "Date of appointment"})
    @IsNotEmpty()
    @IsString()
    appointment_date: Date;

    @IsNotEmpty()
    @IsNumber()
    illnessId: number;

    @ApiProperty({example: "Scheduled", description: "Status of appointment"})
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({example: "Patient is feeling unwell", description: "Notes for appointment"})
    @IsString()
    @IsNotEmpty()
    notes: string;
}
