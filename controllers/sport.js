import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getSports = async (req, res, next) => {
  try {
    const sports = await prisma.sport.findMany();
    res.status(200).json({ sports });
  } catch (error) {
    res.status(400).json({ error });
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
    res.status(400).json({ message: "Please enter name fields" })
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
    res.status(400).json({ error });
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
    res.status(400).json({ error });
  }
};

export const sportsUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sports = await prisma.sport.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        users: true,
      },
    });
    res.status(200).json({ sports });
  } catch (error) {
    res.status(400).json({ error });
  }
}


