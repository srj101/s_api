/*
  Warnings:

  - You are about to drop the column `sportsInterestId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sportsInterestId_fkey";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sportsInterestId",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "coverPicture" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profilePicture" TEXT;

-- CreateTable
CREATE TABLE "SportUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "SportUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImages" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "PostImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLikes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostDislike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostDislike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SportUsers" ADD CONSTRAINT "SportUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportUsers" ADD CONSTRAINT "SportUsers_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImages" ADD CONSTRAINT "PostImages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDislike" ADD CONSTRAINT "PostDislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDislike" ADD CONSTRAINT "PostDislike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
