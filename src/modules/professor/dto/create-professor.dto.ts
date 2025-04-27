import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateProfessorDto {
  @ApiProperty({ example: 'PROF12345' })
  @IsString()
  @Matches(/^[A-Z0-9]{8,}$/, {
    message: 'Matrícula deve conter letras maiúsculas e números, mínimo 8 caracteres'
  })
  matricula: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nomeCompleto: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  dataNascimento: string;

  @ApiProperty({ example: 'Matemática' })
  @IsString()
  especialidade: string;

  @ApiProperty({ example: 'joao.silva@escola.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}