/*
  Warnings:

  - You are about to drop the column `userId` on the `CommunityMembers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityMembers" DROP CONSTRAINT "CommunityMembers_userId_fkey";

-- AlterTable
ALTER TABLE "CommunityMembers" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_user" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_AB_unique" ON "_user"("A", "B");

-- CreateIndex
CREATE INDEX "_user_B_index" ON "_user"("B");

-- AddForeignKey
ALTER TABLE "_user" ADD CONSTRAINT "_user_A_fkey" FOREIGN KEY ("A") REFERENCES "CommunityMembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user" ADD CONSTRAINT "_user_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
