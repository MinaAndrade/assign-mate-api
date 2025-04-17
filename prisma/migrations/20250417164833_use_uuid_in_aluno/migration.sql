/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Aluno_id_seq";
