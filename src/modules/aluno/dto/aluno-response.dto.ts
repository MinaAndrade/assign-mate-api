import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AlunoResponseDto {
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
  curso: string;

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