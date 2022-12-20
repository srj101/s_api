import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma";
import { createError } from "../utils/error";

// @route GET api/auth/user
export const getUser = async (req, res, next) => {
  const { token } = req.body;
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenData) {
    throw createError("Invalid token", 400);
  }
  const user = await prisma.user.findUnique({
    where: {
      id: tokenData.id,
    },
  });
  if (!user) {
    throw createError("User does not exist", 400);
  }
  res.status(200).json({ user });
};
