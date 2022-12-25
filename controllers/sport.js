import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getSports = async (req, res, next) => {
  const { skip, take } = req.query;
  const sports = await prisma.sport.findMany({
    skip: skip,
    take: take,
  });

  if (!sports) {
    throw createError("No sports found", 400);
  }

  res.status(200).json({ sports });
};
