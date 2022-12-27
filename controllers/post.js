import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getPostsByCommunity = async (req, res, next) => {
  const { communityId, skip, take } = req.query;
  const posts = await prisma.post.findMany({
    where: {
      communityId: parseInt(communityId),
    },
    skip: parseInt(skip),
    take: parseInt(take),
  });

  if (!posts) {
    throw createError("No posts found", 400);
  }

  res.status(200).json({ posts });
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  if (!post) {
    throw createError("Post not found", 400);
  }

  res.status(200).json({ post });
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    throw createError("Please enter all fields", 400);
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json({ post });
  } catch (err) {
    throw createError(err.message, 400);
  }
};
