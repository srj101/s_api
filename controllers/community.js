import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

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
