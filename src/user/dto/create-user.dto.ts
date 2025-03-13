import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

import { RegisterUserDto } from "src/auth/dto/register-user.dto";

export class CreateUserDto extends RegisterUserDto {
    @ApiProperty({
        description: "User Role (admin, user, professor, student)",
        default: "user",
        type: "string",
        example: "user",
    })
    @IsString()
    @IsOptional()
    role?: Role;

    @ApiProperty({
        description: "User's full name",
        example: "John Doe",
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "User's date of birth",
        example: "1990-01-01T00:00:00.000Z",
    })
    @IsDate()
    dateOfBirth: Date;

    @ApiProperty({
        description: "User's email address",
        example: "john.doe@example.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's password",
        example: "strongPassword123",
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: "URL to the user's profile image",
        example: "https://example.com/profile.jpg",
        required: false,
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        description: "Timestamp when the user's email was verified",
        example: "2023-10-01T00:00:00.000Z",
        required: false,
    })
    @IsDate()
    @IsOptional()
    emailVerified?: Date;
}