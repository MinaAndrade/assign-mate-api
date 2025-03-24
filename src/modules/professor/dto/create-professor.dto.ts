import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Matches } from 'class-validator';

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
  dataNascimento: Date;

  @ApiProperty({ example: 'Matemática' })
  @IsString()
  especialidade: string;

  @ApiProperty({ example: 'joao.silva@escola.com' })
  @IsEmail()
  email: string;
}