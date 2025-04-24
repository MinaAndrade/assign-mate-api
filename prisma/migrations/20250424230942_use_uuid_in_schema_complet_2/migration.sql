/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_adminId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Disciplina" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Turma" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
