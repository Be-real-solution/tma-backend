-- CreateEnum
CREATE TYPE "AdminTypeEnum" AS ENUM ('admin', 'super_admin');

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "type" "AdminTypeEnum" NOT NULL DEFAULT 'admin';
