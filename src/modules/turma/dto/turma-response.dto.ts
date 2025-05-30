import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TurmaResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  codigo: string;

  @Expose()
  @ApiProperty()
  semestre: string;

  @Expose()
  @ApiProperty({ enum: ['MANHA', 'TARDE', 'NOITE'] })
  turno: string;

  @Expose()
  @ApiProperty({ enum: ['PRESENCIAL', 'EAD', 'SEMI_PRESENCIAL'] })
  modalidade: string;

  @Expose()
  @ApiProperty()
  cursoId: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}