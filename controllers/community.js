import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

export const createCommunity = async (req, res, next) => {
  const { name, description, sportId } = req.body;
  if (!name || !description || !sportId) {
    throw createError("Please enter all fields", 400);
  }
  const community = await prisma.community.create({
    data: {
      name,
      description,
      sportId,
    },
  });
  res.status(200).json({ community });
};

export const getCommunites = async (req, res, next) => {
  const { skip, take } = req.query;
  const communities = await prisma.community.findMany({
    skip: skip,
    take: take,
  });

  if (!communities) {
    throw createError("No communities found", 400);
  }

  res.status(200).json({ communities });
};

export const getCommunityById = async (req, res, next) => {
  const { id } = req.params;
  const community = await prisma.community.findUnique({
    where: {
      id: id,
    },
  });

  if (!community) {
    throw createError("Community not found", 400);
  }

  res.status(200).json({ community });
};

export const deleteCommunity = async (req, res, next) => {
  const { id } = req.params;
  const community = await prisma.community.delete({
    where: {
      id: id,
    },
  });

  if (!community) {
    throw createError("Community not found", 400);
  }

  res.status(200).json({ community });
};
