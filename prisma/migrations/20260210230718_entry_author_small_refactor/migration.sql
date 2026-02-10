-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imgUrl" TEXT;
