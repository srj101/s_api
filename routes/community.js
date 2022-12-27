import express from "express";

import {
  createCommunity,
  deleteCommunity,
  getCommunites,
  getCommunityById,
} from "../controllers/community.js";
import { getPostsByCommunity } from "../controllers/post.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/comunites", getCommunites);
router.get("/comunites/:id", getCommunityById);
router.get("/posts", getPostsByCommunity);

// ---------------------  POST ---------------------
router.post("/createCommunity", createCommunity);

// ---------------------  PUT ---------------------

// ---------------------  DELETE ---------------------
router.delete("/deleteCommunity/:id", deleteCommunity);

export default router;
