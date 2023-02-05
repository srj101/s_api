/*
  Warnings:

  - You are about to drop the `_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `CommunityMembers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_user" DROP CONSTRAINT "_user_A_fkey";

-- DropForeignKey
ALTER TABLE "_user" DROP CONSTRAINT "_user_B_fkey";

-- AlterTable
ALTER TABLE "CommunityMembers" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_user";

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
