import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, NotContains, IsBoolean } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({
        description: "User's full name",
        nullable: false,
        required: true,
        type: "string",
        example: "John Doe",
    })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: "User's date of birth",
        nullable: false,
        required: true,
        type: "string",
        format: "date-time",
        example: "1990-01-01T00:00:00.000Z",
    })
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @ApiProperty({
        description: "User's email address",
        uniqueItems: true,
        nullable: false,
        required: true,
        type: "string",
        example: "mail@mail.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password: Minimum of 6 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    })
    @NotContains(' ', { message: 'Password must not contain spaces' })
    password: string;

    @ApiProperty({
        description: "Password confirmation, must match the password",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    passwordconf: string;

    @ApiProperty({
        description: "User's profile image URL",
        nullable: true,
        required: false,
        type: "string",
        example: "https://picsum.photos/200/300",
    })
    @IsString()
    @IsOptional()
    image?: string;

    // Permitir isAdmin como campo opcional, mas com valor padrão true
    @ApiProperty({
        description: "Whether the user has administrative privileges",
        example: true,
        required: false,
    })
    @IsBoolean()
    isAdmin?: boolean = true;  // Permite isAdmin como campo opcional
}