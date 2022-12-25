import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

// @route POST api/auth/register

export const register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!email || !password || !firstName || !lastName) {
    throw createError("Please enter all fields", 400);
  }
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  res.status(200).json({ token });
};

// @route POST api/auth/login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError("Please enter all fields", 400);
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw createError("User does not exist", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError("Invalid credentials", 400);
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  res.status(200).json({ token });
};
