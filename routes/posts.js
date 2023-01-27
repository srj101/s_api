import express from "express";
import {
  createComment,
  deleteComment,
  replyComment,
  updateComment,
} from "../controllers/post.js";
import {
  createPost,
  deletePost,
  DisLikePost,
  DisLikeRemove,
  getCommentsByPost,
  getCommunityPostsByUser,
  getPostsByUser,
  IsDisliked,
  IsLiked,
  LikePost,
  LikeRemove,
  updatePost,
  uploadImages,
} from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------

router.get("/postsByUser", getPostsByUser);

router.get("/communityPostsByUser/:id", getCommunityPostsByUser);
router.get("/comments/:postId", getCommentsByPost);
router.get("/isLiked/:id", IsLiked);
router.get("/isDisliked/:id", IsDisliked);

// ---------------------  POST ---------------------
router.post("/createPost", uploadImages, createPost);
router.post("/createComment/:postId", createComment);
router.post("/replyComment/", replyComment);
router.post("/like/:id", LikePost);
router.post("/dislike/:id", DisLikePost);

// ---------------------  PUT ---------------------
router.put("/updatePost/:id", updatePost);
router.put("/updateComment/:id", updateComment);

// ---------------------  DELETE ---------------------
router.delete("/deletePost/:id", deletePost);
router.delete("/deleteComment/:id", deleteComment);
router.delete("/likeRemove", LikeRemove);
router.delete("/dislikeRemove", DisLikeRemove);

export default router;
