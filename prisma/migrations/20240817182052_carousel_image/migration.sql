/*
  Warnings:

  - Added the required column `image_link` to the `carousel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carousel" ADD COLUMN     "image_link" VARCHAR NOT NULL;
