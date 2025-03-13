import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        description: "User's email address",
        nullable: false,
        required: true,
        type: "string",
        example: "mail@mail.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's password",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    password: string;
}