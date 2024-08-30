/*
  Warnings:

  - You are about to drop the column `category_id` on the `new` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "new" DROP CONSTRAINT "new_category_id_fkey";

-- AlterTable
ALTER TABLE "building" ALTER COLUMN "work_end_time" DROP NOT NULL,
ALTER COLUMN "work_start_time" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "new" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "_CategoryToNew" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToNew_AB_unique" ON "_CategoryToNew"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToNew_B_index" ON "_CategoryToNew"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToNew" ADD CONSTRAINT "_CategoryToNew_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToNew" ADD CONSTRAINT "_CategoryToNew_B_fkey" FOREIGN KEY ("B") REFERENCES "new"("id") ON DELETE CASCADE ON UPDATE CASCADE;
