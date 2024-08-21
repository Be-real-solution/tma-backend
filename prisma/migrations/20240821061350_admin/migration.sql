-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "full_name" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
