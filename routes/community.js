import express from "express";

import {
  AlreadyMemeber,
  createCommunity,
  deleteCommunity,
  deleteMember,
  getCommunities,
  getCommunitiesByUser,
  getCommunityById,
  getCommunityOwnerInfo,
  getMembersByCommunity,
  getMyCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from "../controllers/community.js";
import { getMyPost, getPostsByCommunity } from "../controllers/post.js";


const router = express.Router();

// ---------------------  GET ---------------------
router.get("/communitiesList", getCommunities);
router.get("/communities/:id", getCommunityById);
router.get("/myCommunities", getMyCommunity);
router.get("/posts/:id", getPostsByCommunity);
router.get("/mypost", getMyPost)
router.get("/members/:id", getMembersByCommunity);
router.get("/communities", getCommunitiesByUser);
router.get("/ownerInfo/:id", getCommunityOwnerInfo);
router.get("/isAlreadyMemeber/:id", AlreadyMemeber);
// ---------------------  POST ---------------------
router.post("/createCommunity", createCommunity);
router.post("/joinCommunity/:id", joinCommunity);
// ---------------------  PUT ---------------------
router.put("/updateCommunity/:id", updateCommunity);
// ---------------------  DELETE ---------------------
router.delete("/deleteCommunity/:id", deleteCommunity);
router.delete("/leaveCommunity/:id", leaveCommunity);
router.delete("/deleteMember/", deleteMember);

export default router;
