import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateProfessorDto } from './create-professor.dto';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
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

  @ApiProperty({ required: false, minLength: 6 })
  @IsOptional()
  @MinLength(6)
  password?: string;
}