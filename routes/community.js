import express from "express";

import {
  createCommunity,
  deleteCommunity,
  deleteMember,
  getCommunites,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from "../controllers/community.js";
import { getPostsByCommunity } from "../controllers/post.js";
import { getMembersByCommunity } from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/comunites", getCommunites);
router.get("/comunites/:id", getCommunityById);
router.get("/posts", getPostsByCommunity);
router.get("/members/:id", getMembersByCommunity);

// ---------------------  POST ---------------------
router.post("/createCommunity", createCommunity);
router.post("/jointCommunity/:id", joinCommunity);
// ---------------------  PUT ---------------------
router.put("/updateCommunity/:id", updateCommunity);
// ---------------------  DELETE ---------------------
router.delete("/deleteCommunity/:id", deleteCommunity);
router.delete("/leaveCommunity/:id", leaveCommunity);
router.delete("/deleteMember/", deleteMember);

export default router;
