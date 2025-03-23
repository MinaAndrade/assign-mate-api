import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;
}