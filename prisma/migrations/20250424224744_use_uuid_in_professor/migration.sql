/*
  Warnings:

  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Professor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Professor_id_seq";
