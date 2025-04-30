import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateDisciplinaDto {
  @ApiProperty({ example: 'MAT101', description: 'Código único da disciplina' })
  @IsString()
  @Length(3, 10)
  codigo: string;

  @ApiProperty({ example: 'Cálculo I' })
  @IsString()
  @Length(5, 100)
  nome: string;

  @ApiProperty({ required: false })
  @IsString()
  descricao?: string;

  @ApiProperty({ example: 60, minimum: 30, maximum: 200 })
  @IsInt()
  @Min(30)
  @Max(200)
  cargaHoraria: number;

  @ApiProperty({ example: '2023.1', description: 'Período letivo' })
  @IsString()
  periodo: string;

  @ApiProperty({ example: 1, description: 'ID do curso relacionado' })
  @IsString()
  @IsNotEmpty()
  cursoId: string;
}