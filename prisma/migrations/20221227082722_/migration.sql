-- DropForeignKey
ALTER TABLE "CommunityMembers" DROP CONSTRAINT "CommunityMembers_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityMembers" DROP CONSTRAINT "CommunityMembers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_communityId_fkey";

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
