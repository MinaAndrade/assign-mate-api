/*
  Warnings:

  - The primary key for the `Disciplina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Turma` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Disciplina_id_seq";

-- AlterTable
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Turma_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Turma_id_seq";
