/*
  Warnings:

  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_cursoId_fkey";

-- AlterTable
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Curso_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Curso_id_seq";

-- AlterTable
ALTER TABLE "Disciplina" ALTER COLUMN "cursoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Turma" ALTER COLUMN "cursoId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
