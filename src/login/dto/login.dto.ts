import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty()
    @IsString()
    userId: string;
    @ApiProperty()
    @IsString()
    password: string;
}
