import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getPostsByCommunity = async (req, res, next) => {
  const { communityId, skip, take } = req.query;
  const posts = await prisma.post.findMany({
    where: {
      communityId: communityId,
    },
    skip: skip,
    take: take,
  });

  if (!posts) {
    throw createError("No posts found", 400);
  }

  res.status(200).json({ posts });
};
