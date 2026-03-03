-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_entryId_fkey";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
