import express from "express";
import { createComment, deleteComment, replyComment } from "../controllers/post.js";
import {
  createPost,
  deletePost,
  getCommentsByPost,
  getCommunityPostsByUser,
  getPostsByUser,
  updatePost,
} from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------

router.get("/postsByUser", getPostsByUser);


router.get("/communityPostsByUser/:id", getCommunityPostsByUser);
router.get("/comments/:postId", getCommentsByPost)

// ---------------------  POST ---------------------
router.post("/createPost/:id", createPost);
router.post("/createComment/:postId", createComment)
router.post("/replyComment/", replyComment)

// ---------------------  PUT ---------------------
router.put("/updatePost/:id", updatePost);

// ---------------------  DELETE ---------------------
router.delete("/deletePost/:id", deletePost);
router.delete("/deleteComment/:id", deleteComment);

export default router;
