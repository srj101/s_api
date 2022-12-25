import express from "express";
import {} from "../controllers/post.js";
import {
  createPost,
  deletePost,
  getCommunityPostsByUser,
  getPostsByUser,
  updatePost,
} from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/postsByUser/:id", verifyUser, getPostsByUser);
router.get("communityPostsByUser/:id", verifyUser, getCommunityPostsByUser);

// ---------------------  POST ---------------------
router.post("/createPost", verifyUser, createPost);

// ---------------------  PUT ---------------------
router.put("/updatePost/:id", verifyUser, updatePost);

// ---------------------  DELETE ---------------------
router.delete("/deletePost/:id", verifyUser, deletePost);

export default router;
