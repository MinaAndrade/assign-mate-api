import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {

    @ApiProperty({
        description: "Email",
        nullable: false,
        required: true,
        type: "string",
        example: "mail@mail.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User Password",
        nullable: false,
        required: true,
        type: "string",
        example: "Senha123",
    })
    @IsString()
    password: string;

};
