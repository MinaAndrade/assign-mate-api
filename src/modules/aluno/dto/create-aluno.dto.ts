import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Matches } from 'class-validator';

export class CreateAlunoDto {
  @ApiProperty({ example: 'ALUNO12345' })
  @IsString()
  @Matches(/^[A-Z0-9]{8,}$/, {
    message: 'Matrícula deve conter letras maiúsculas e números, mínimo 8 caracteres'
  })
  matricula: string;

  @ApiProperty({ example: 'Maria Oliveira' })
  @IsString()
  nomeCompleto: string;

  @ApiProperty({ example: '2005-05-15' })
  @IsDateString()
  dataNascimento: Date;

  @ApiProperty({ example: 'Engenharia de Software' })
  @IsString()
  curso: string;

  @ApiProperty({ example: 'maria.oliveira@escola.com' })
  @IsEmail()
  email: string;
}