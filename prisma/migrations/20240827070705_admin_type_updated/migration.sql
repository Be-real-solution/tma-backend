/*
  Warnings:

  - The values [super_admin] on the enum `AdminTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminTypeEnum_new" AS ENUM ('admin', 'super');
ALTER TABLE "admin" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "admin" ALTER COLUMN "type" TYPE "AdminTypeEnum_new" USING ("type"::text::"AdminTypeEnum_new");
ALTER TYPE "AdminTypeEnum" RENAME TO "AdminTypeEnum_old";
ALTER TYPE "AdminTypeEnum_new" RENAME TO "AdminTypeEnum";
DROP TYPE "AdminTypeEnum_old";
ALTER TABLE "admin" ALTER COLUMN "type" SET DEFAULT 'admin';
COMMIT;
