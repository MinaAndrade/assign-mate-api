/*
  Warnings:

  - Added the required column `password` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "password" TEXT NOT NULL;
