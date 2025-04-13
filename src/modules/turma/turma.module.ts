import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TurmaController } from './turma.controller';
import { TurmaService } from './turma.service';


@Module({
  imports: [PrismaModule],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}