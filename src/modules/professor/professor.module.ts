import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}