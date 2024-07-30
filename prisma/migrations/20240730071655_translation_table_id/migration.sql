/*
  Warnings:

  - Added the required column `table_id` to the `translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "translation" ADD COLUMN     "table_id" UUID NOT NULL;
