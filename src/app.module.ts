import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { CursoModule } from './modules/curso/curso.module';
import { DisciplinaModule } from './modules/disciplina/disciplina.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    AdminModule,
    ProfessorModule,
    AlunoModule,
    CursoModule,
    DisciplinaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
