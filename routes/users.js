import express from "express";
import {
  acceptFriendRequest,
  createConversation,
  createPost,
  declineFriendRequest,
  deleteFriend,
  deleteFriendRequest,
  deletePost,
  getCommunityPostsByUser,
  getConversation,
  getConversationsByUser,
  getFriendRequestReceivedByUser,
  getFriendRequestSentByUser,
  getFriends,
  getMessagesByConversation,
  getPostsByUser,
  getUser,
  sendFriendRequest,
  sendMessage,
  updatePost,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/me", verifyUser, getUser);

// Friend Requests
router.get("/friends", verifyUser, getFriends);
router.get(
  "/friendrequestsRecieved",
  verifyUser,
  getFriendRequestReceivedByUser
);
router.get("/friendrequestsSent", verifyUser, getFriendRequestSentByUser);

// Conversation
router.get("/conversations", verifyUser, getConversationsByUser);
router.get("/conversations/:id", verifyUser, getConversation);
router.get(
  "/messagesByConversation/:id",
  verifyUser,
  getMessagesByConversation
);

// Posts
router.get("/postsByUser/:id", verifyUser, getPostsByUser);
router.get("communityPostsByUser/:id", verifyUser, getCommunityPostsByUser);

// ---------------------  POST ---------------------

// Friend Requests
router.post("/sendFriendRequest/:id", verifyUser, sendFriendRequest);
router.post("/acceptFriendRequest/:id", verifyUser, acceptFriendRequest);

// Conversation
router.post("createConversation/:id", verifyUser, createConversation);
router.post("sendMessage/:id", verifyUser, sendMessage);

// Posts
router.post("/createPost", verifyUser, createPost);

// ---------------------  UPDATE ---------------------
// posts
router.put("/updatePost/:id", verifyUser, updatePost);

// ---------------------  DELETE ---------------------
// Friend Requests
router.delete("/declineFriendRequest/:id", verifyUser, declineFriendRequest);
router.delete("/deleteFriend/:id", verifyUser, deleteFriend);
router.delete("/deleteFriendRequest/:id", verifyUser, deleteFriendRequest);

// Posts
router.delete("/deletePost/:id", verifyUser, deletePost);

// ---------------------  PATCH ---------------------

export default router;
