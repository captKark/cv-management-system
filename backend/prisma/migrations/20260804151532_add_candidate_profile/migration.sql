/*
  Warnings:

  - You are about to drop the column `candidateName` on the `CV` table. All the data in the column will be lost.
  - Added the required column `candidateId` to the `CV` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CV" DROP COLUMN "candidateName",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
