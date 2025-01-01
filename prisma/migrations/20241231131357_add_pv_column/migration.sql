/*
  Warnings:

  - Added the required column `PV` to the `TNews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TNews" ADD COLUMN "PV" INT NOT NULL DEFAULT 0;
