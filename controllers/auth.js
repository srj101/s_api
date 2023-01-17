import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

// @route POST api/auth/register

export const register = async (req, res, next) => {
  const { email, password, firstName, lastName, dob } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!email || !password || !firstName || !lastName || !dob) {
    res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        dob: new Date(dob),
      },
    });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// @route POST api/auth/login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  res.status(200).json({ token });
};
