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

// Route to get all members of a community
export const getMembersByCommunity = async (req, res, next) => {
  const { page, limit } = req.query;
  const { id } = req.params
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    const members = await prisma.community.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                profilePicture: true,
                firstName: true,
                lastName: true,
                sports: {
                  select: {
                    sport: true,
                  }
                }
              }
            }
          },
        },

      },
      skip: parseInt(offset),
      take: parseInt(perPage),

    });

    res.status(200).json({ members });

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}


export const getCommunitiesByUser = async (req, res, next) => {
  const { userId } = req.query;
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    const communities = await prisma.communityMembers.findMany({
      where: {
        userId: parseInt(userId),
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
  const { id } = req.user;

  try {
    const communitiesList = await prisma.community.findMany({
      where: {
        ownerId: {
          not: parseInt(id)
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        ownerId: true,
        sportId: true,
        members: {
          select: {
            userId: true,
          }
        }

      },
      skip: parseInt(offset),
      take: parseInt(perPage),
    });

    const communities = communitiesList.map((community) => {
      const isMember = community.members.some((member) => member.userId === parseInt(id));
      return {
        ...community,
        isMember: isMember,
      }
    })
    console.log(communities)
    res.status(200).json({ communities });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

export const getCommunityById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const community = await prisma.community.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        description: true,
        name: true,
        image: true,
        ownerId: true,
        sportId: true,
        members: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePicture: true,
              }
            }
          }
        },
        owner: {
          select: {
            firstName: true,
            lastName: true,

          },
        },
        sport: {
          select: {
            name: true,
          }
        }

      }
    });



    res.status(200).json({ community });
  } catch (error) {
    res.status(400).json({ message: "Community not found" });
  }
};

export const getMyCommunity = async (req, res, next) => {
  const { id } = req.user;
  const { page, limit } = req.query;
  const currentPage = page || 1;
  const perPage = limit || 10;
  const offset = (currentPage - 1) * perPage;
  try {
    const communities = await prisma.community.findMany({
      where: {
        ownerId: parseInt(id),
      },
      skip: parseInt(offset),
      take: parseInt(perPage)
    });
    res.status(200).json({ communities });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getCommunityOwnerInfo = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    const community = await prisma.community.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        ownerId: true,
      }
    });
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(community.ownerId),
      },
      select: {
        firstName: true,
        lastName: true,
      }
    });
    console.log(user)
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

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
    res.status(400).json({ error: error.message })
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
    res.status(400).json({ error: error.message })
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
    res.status(400).json({ error: error.message })
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
    res.status(400).json({ error: error.message })
  }
}