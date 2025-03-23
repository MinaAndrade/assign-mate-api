import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';

@Module({
  imports: [PrismaModule],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}