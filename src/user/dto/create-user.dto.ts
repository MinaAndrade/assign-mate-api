import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsDateString, IsOptional, IsBoolean, Matches } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
    @ApiProperty({
        description: "User's full name",
        example: "John Sample",
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "User's email address",
        example: "youremail@example.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's date of birth",
        format: "date-time",
        example: "1990-01-01T00:00:00.000Z",
    })
    @IsDateString()
    @Type(() => Date)
    dateOfBirth: Date;

    @ApiProperty({
        description: "Password to be set for the user",
        example: "strongpassword123",
    })
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password too weak. It must contain at least one letter, one number, and be at least 8 characters long.',
    })
    password: string;

    @ApiProperty({
        description: "Confirm the password",
        example: "strongpassword123",
    })
    @IsString()
    passwordconf: string;

    @ApiProperty({
        description: "Whether the user has administrative privileges",
        example: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;

    @ApiProperty({
        description: "URL to the user's profile image",
        example: "https://picsum.photos/200",
        required: false,
    })
    @IsOptional()
    @IsString()
    image?: string;
}
