import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

@Module({
  imports: [PrismaModule],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}