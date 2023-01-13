import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

export const createCommunity = async (req, res, next) => {
  const { name, description, sportId } = req.body;
  const { id } = req.user;
  console.log(req.body)
  if (!name || !description || !sportId) {
    res.status(400).json({ message: "Please fill all the fields" })
  }
  try {
    const community = await prisma.community.create({
      data: {
        name: name,
        description: description,
        sportId: parseInt(sportId),
        ownerId: parseInt(id),
      },
      select: {
        name: true,
        description: true,
        sportId: true,
        ownerId: true,
      }
    });
    res.status(200).json({ community });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getCommunitiesByUser = async (req, res, next) => {
  const { id } = req.user
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    const communities = await prisma.communityMembers.findMany({
      where: {
        userId: parseInt(id),
      },
      select: {
        community: true
      },
      skip: parseInt(offset),
      take: parseInt(perPage),

    });
    res.status(200).json({ communities });
  } catch (error) {
    res.status(400).json({ error })
  }



}

export const getCommunities = async (req, res, next) => {
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;

  try {
    const communities = await prisma.community.findMany({
      skip: parseInt(offset),
      take: parseInt(perPage),
    });

    res.status(200).json({ communities });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCommunityById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const community = await prisma.community.findUnique({
      where: {
        id: parseInt(id),

      },
    });


    res.status(200).json({ community });
  } catch (error) {
    res.status(400).json({ message: "Community not found" });
  }
};

export const deleteCommunity = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const hasAccess = await prisma.community.findMany({
      where: {
        id: parseInt(id),
        ownerId: parseInt(userId)
      },
    });
    if (!hasAccess) {
      res.status(400).json({ message: "You don't have access to delete this community" });
    }
    const community = await prisma.community.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ community });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
};

export const joinCommunity = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const community = await prisma.community.findUnique({
      where: {
        id: parseInt(id),
      },
    });


    if (!community) {
      res.status(400).json({ message: "Community not found" });
    }

    if (community.ownerId === parseInt(userId)) {
      res.status(400).json({ message: "You are owner of this community" });
    }

    const user = await prisma.communityMembers.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (user) {
      res.status(409).json({ message: "Already member" });
    }
    const userCommunity = await prisma.communityMembers.create({
      data: {
        communityId: parseInt(id),
        userId: parseInt(userId),
      },
    });
    res.status(200).json({ userCommunity });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Something went wrong" });
  }
}

export const leaveCommunity = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const isAlreadyMember = await prisma.communityMembers.findFirst({
      where: {
        communityId: parseInt(id),
        userId: parseInt(userId),
      },

    });

    if (!isAlreadyMember) {
      res.status(400).json({ message: "You are not member of this community" });
    }

    const isOwner = await prisma.community.findFirst({
      where: {
        id: parseInt(id),
        ownerId: parseInt(userId),
      },
    });

    if (isOwner) {
      res.status(400).json({ message: "You are owner of this community" });
    }

    const leaveCommunity = await prisma.communityMembers.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ leaveCommunity });

  }

  catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}


export const deleteMember = async (req, res, next) => {
  const { id, memberId } = req.query;
  const { id: userId } = req.user;

  try {
    const isCommunityExist = await prisma.community.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!isCommunityExist) {
      res.status(400).json({ message: "Community not found" });
    }

    const isAlreadyMember = await prisma.communityMembers.findFirst({
      where: {
        communityId: parseInt(id),
        userId: parseInt(memberId),
      },
      select: {
        id: true,
      }
    });

    if (!isAlreadyMember) {
      res.status(400).json({ message: "This user is not member of this community" });
    }

    const isOwner = await prisma.community.findFirst({
      where: {
        id: isAlreadyMember.id,
        ownerId: parseInt(userId),
      },
    });

    if (userId === memberId) {
      res.status(400).json({ message: "You can't remove yourself" });
    }

    if (!isOwner) {
      res.status(400).json({ message: "You're not authorized to remove owner" });
    }

    const deleteMember = await prisma.communityMembers.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ deleteMember });

  }

  catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}

export const updateCommunity = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { name, description, sportId } = req.body;

  try {
    const hasAccess = await prisma.community.findMany({
      where: {
        id: parseInt(id),
        ownerId: parseInt(userId)
      },
    });
    if (!hasAccess) {
      res.status(400).json({ message: "You don't have access to update this community" });
    }
    const community = await prisma.community.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
        sportId: parseInt(sportId),
      },
    });
    res.status(200).json({ community });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }
}