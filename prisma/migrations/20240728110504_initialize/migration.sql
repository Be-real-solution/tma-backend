CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "LanguageEnum" AS ENUM ('uz', 'ru', 'en');

-- CreateTable
CREATE TABLE "author" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "full_name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_image" (
    "new_id" UUID NOT NULL,
    "image_link" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "new_image_pkey" PRIMARY KEY ("new_id")
);

-- CreateTable
CREATE TABLE "new" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "author_id" UUID NOT NULL,
    "views_count" INTEGER NOT NULL DEFAULT 1,
    "description" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "building" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    "work_end_time" VARCHAR NOT NULL,
    "work_start_time" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "text" VARCHAR NOT NULL,
    "language" "LanguageEnum" NOT NULL,
    "table_field" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "new_image" ADD CONSTRAINT "new_image_new_id_fkey" FOREIGN KEY ("new_id") REFERENCES "new"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "new" ADD CONSTRAINT "new_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
