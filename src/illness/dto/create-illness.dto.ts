import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty, IsString} from "class-validator"

export class CreateIllnessDto {
    @ApiProperty({example: "Ali", description: " Name of illness"})
    @IsNotEmpty()
    @IsString()
    name: string
    @ApiProperty({example: "Description of ilness", description: "Description of ilness"})
    @IsNotEmpty()
    @IsString()
    description: string
}
