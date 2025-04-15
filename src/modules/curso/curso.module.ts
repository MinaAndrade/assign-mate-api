import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}