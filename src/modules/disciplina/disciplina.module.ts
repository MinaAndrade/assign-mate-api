import { Module } from '@nestjs/common';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}