-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "description" TEXT,
ADD COLUMN     "maxProjects" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "projectTag" TEXT,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'Public';
