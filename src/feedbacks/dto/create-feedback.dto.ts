import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty, IsNumber, IsString} from "class-validator"

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number
    @ApiProperty({example: "1", description: " rating of hospital"})
    @IsNotEmpty()
    @IsString()
    rating: string
    @ApiProperty({example: "That was good", description: " comment of rating"})
    @IsNotEmpty()
    @IsString()
    comment: string
}
