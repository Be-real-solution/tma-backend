/*
  Warnings:

  - The primary key for the `new_image` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "new_image" DROP CONSTRAINT "new_image_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
ADD CONSTRAINT "new_image_pkey" PRIMARY KEY ("id");
