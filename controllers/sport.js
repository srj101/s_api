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

export const createSport = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    throw createError("Please enter all fields", 400);
  }
  const sport = await prisma.sport.create({
    data: {
      name,
    },
  });
  res.status(200).json({ sport });
};

export const getSportById = async (req, res, next) => {
  const { id } = req.params;
  const sport = await prisma.sport.findUnique({
    where: {
      id: id,
    },
  });

  if (!sport) {
    throw createError("Sport not found", 400);
  }

  res.status(200).json({ sport });
};

export const updateSport = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    throw createError("Please enter all fields", 400);
  }

  try {
    const sport = await prisma.sport.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteSport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sport = await prisma.sport.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error });
  }
};
