import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ example: 'CS101', description: 'Código único do curso' })
  @IsString()
  @Length(3, 10)
  codigo: string;

  @ApiProperty({ example: 'Introdução à Programação', description: 'Nome do curso' })
  @IsString()
  @Length(5, 100)
  nome: string;

  @ApiProperty({ example: 'Curso introdutório de programação', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;
}