import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateAlunoDto } from './create-aluno.dto';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^[A-Z0-9]{8,}$/, {
    message: 'Matrícula deve conter letras maiúsculas e números, mínimo 8 caracteres'
  })
  matricula?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}