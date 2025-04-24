import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CursoResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  codigo: string;

  @Expose()
  @ApiProperty()
  nome: string;

  @Expose()
  @ApiProperty({ required: false })
  descricao?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}