import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getSports = async (req, res, next) => {
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;

  try {
    const sports = await prisma.sport.findMany({
      skip: parseInt(offset),
      take: parseInt(perPage),
    });
    const total = await prisma.sport.count();
    console.log(total);
    res.status(200).json({ sports, total });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const findSportsInterestByUserID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const interest = await prisma.sportUsers.findMany({
      where: {
        userId: parseInt(id),
      },
      include: {
        sport: true,
      },
    });
    res.status(200).json({ interest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createSport = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Please enter name fields" });
  }
  try {
    const sport = await prisma.sport.create({
      data: {
        name,
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getSportById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sport = await prisma.sport.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json("Sports Doesn't Found");
  }
};

export const updateSport = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Please enter name fields" });
  }

  try {
    const sport = await prisma.sport.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sport = await prisma.sport.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sportsUser = async (req, res, next) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    const sports = await prisma.sportUsers.findMany({
      where: {
        sportId: parseInt(id),
      },
      include: {
        user: true,
      },
      skip: parseInt(offset),
      take: parseInt(perPage),
    });

    res.status(200).json({ sports });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sportsFollow = async (req, res, next) => {
  const { sportId } = req.body;
  const { id: userId } = req.user;

  try {
    const isExits = await prisma.sportUsers.findFirst({
      where: {
        sportId: parseInt(sportId),
        userId: parseInt(userId),
      },
    });
    if (isExits) {
      res.status(400).json({ message: "Already Followed" });
    }
    const sport = await prisma.sportUsers.create({
      data: {
        sportId: parseInt(sportId),
        userId: parseInt(userId),
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const isFollowing = async (req, res, next) => {
  const { sportId } = req.query;
  const { id: userId } = req.user;
  try {
    const isExits = await prisma.sportUsers.findFirst({
      where: {
        sportId: parseInt(sportId),
        userId: parseInt(userId),
      },
    });
    if (isExits) {
      res.status(200).json({ isFollowing: true });
    } else {
      res.status(200).json({ isFollowing: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const UnFollowSport = async (req, res, next) => {
  const { sportId } = req.params;
  const { id: userId } = req.user;
  try {
    const isExits = await prisma.sportUsers.findFirst({
      where: {
        sportId: parseInt(sportId),
        userId: parseInt(userId),
      },
    });
    if (!isExits) {
      res.status(400).json({ message: "Already UnFollowed" });
    }
    const sport = await prisma.sportUsers.delete({
      where: {
        id: parseInt(isExits.id),
      },
    });
    res.status(200).json({ sport });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
