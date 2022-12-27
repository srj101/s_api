import express from "express";
import { } from "../controllers/post.js";
import {
  createPost,
  deletePost,
  getCommunityPostsByUser,
  getPostsByUser,
  updatePost,
} from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/postsByUser/:id", getPostsByUser);


router.get("/communityPostsByUser/:id", getCommunityPostsByUser);

// ---------------------  POST ---------------------
router.post("/createPost", createPost);

// ---------------------  PUT ---------------------
router.put("/updatePost/:id", updatePost);

// ---------------------  DELETE ---------------------
router.delete("/deletePost/:id", deletePost);

export default router;
