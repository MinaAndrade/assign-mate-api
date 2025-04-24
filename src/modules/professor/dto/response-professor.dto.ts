import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class ProfessorResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  matricula: string;

  @Expose()
  @ApiProperty()
  nomeCompleto: string;

  @Expose()
  @ApiProperty()
  dataNascimento: Date;

  @Expose()
  @ApiProperty()
  especialidade: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}