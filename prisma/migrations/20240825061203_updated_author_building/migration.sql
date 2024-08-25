/*
  Warnings:

  - You are about to drop the column `image_link` on the `building` table. All the data in the column will be lost.
  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "new" DROP CONSTRAINT "new_author_id_fkey";

-- AlterTable
ALTER TABLE "building" DROP COLUMN "image_link",
ADD COLUMN     "main_image" VARCHAR NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "new" ADD COLUMN     "main_image" VARCHAR NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "author";

-- CreateTable
CREATE TABLE "building_image" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "building_id" UUID NOT NULL,
    "image_link" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "building_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "new" ADD CONSTRAINT "new_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "building_image" ADD CONSTRAINT "building_image_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
