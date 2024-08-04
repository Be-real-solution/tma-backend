/*
  Warnings:

  - Added the required column `latitude` to the `building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `new` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "building" ADD COLUMN     "latitude" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(9,6) NOT NULL;

-- AlterTable
ALTER TABLE "new" ADD COLUMN     "category_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "new" ADD CONSTRAINT "new_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
