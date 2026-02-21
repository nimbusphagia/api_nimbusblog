/*
  Warnings:

  - Made the column `title` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'New Blog Entry';
