import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, NotContains } from "class-validator";

export class RegisterUserDto {

    @ApiProperty({
        description: "Nome",
        nullable: false,
        required: true,
        type: "string",
        example: "João Exemplo",
    })
    @IsString()
    @MinLength(3)
    name: string;

    
    @ApiProperty({
        description: "Email",
        uniqueItems: true,
        nullable: false,
        required: true,
        type: "string",
        example: "mail@mail.com",
    })
    @IsEmail()
    email: string;
    
    
    @ApiProperty({
        description: "Senha: Mínimo de 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número",
        nullable: false,
        required: true,
        type: "string",
        example: "Senha123",
    })
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
    })
    @NotContains(' ', { message: 'A senha não deve conter espaços' }) 
    password: string;
    
    @ApiProperty({
        description: "Confirmação de Senha, deve ser igual à senha",
        nullable: false,
        required: true,
        type: "string",
        example: "Senha123",
    })
    @IsString()
    passwordconf: string;
    

    @ApiProperty({
        description: "Imagem de Avatar do Usuário",
        nullable: true,
        required: false,
        type: "string",
        example: "https://picsum.photos/200/300",
    })
    @IsString()
    @IsOptional()
    image: string;
    
}