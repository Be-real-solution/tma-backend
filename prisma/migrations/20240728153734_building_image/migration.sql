/*
  Warnings:

  - Added the required column `image_link` to the `building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "building" ADD COLUMN     "image_link" VARCHAR NOT NULL;
