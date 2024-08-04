/*
  Warnings:

  - You are about to alter the column `latitude` on the `building` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `VarChar(10)`.
  - You are about to alter the column `longitude` on the `building` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "building" ALTER COLUMN "latitude" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "longitude" SET DATA TYPE VARCHAR(10);
