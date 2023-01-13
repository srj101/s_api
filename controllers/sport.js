import { createError } from "../utils/error.js";
import prisma from "../prisma/prisma.js";

export const getSports = async (req, res, next) => {
  console.log("Hello")
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
    console.log(total)
    res.status(200).json({ sports, total });

  }
  catch (error) {
    console.log("error:", error)
    res.status(400).json({ error });
  }

}

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
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  console.log("Okey From Sports User")
  try {
    const sports = await prisma.sport.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        users: {
          skip: parseInt(offset),
          take: parseInt(perPage),
        },
      },
    });

    res.status(200).json({ users: sports.users, total: sports.users.length });
  }
  catch (error) {
    res.status(400).json({ error });
  }
}


export const sportsFollow = async (req, res, next) => {
  const { id } = req.body;
  const { userId } = req.user;
  try {
    const sport = await prisma.sport.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!sport) {
      res.status(404).json({ message: "Sport not found" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isFollow = await prisma.sport.findFirst({
      where: {
        id: parseInt(id),
        users: {
          some: {
            id: parseInt(userId),
          },
        },

      },
    });
    if (isFollow) {
      res.status(200).json({ message: "You are already following this sport" });
    }
    const follow = await prisma.sport.update({
      where: {
        id: parseInt(id),
      },
      data: {
        users: {
          connect: {
            id: parseInt(userId),
          },
        },

      },
    });

    res.status(200).json({ follow });
  } catch (error) {
    res.status(400).json({ error });
  }


}