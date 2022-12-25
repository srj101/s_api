import express from "express";
import {
  acceptFriendRequest,
  createConversation,
  declineFriendRequest,
  deleteFriend,
  deleteFriendRequest,
  getConversation,
  getConversationsByUser,
  getFriendRequestReceivedByUser,
  getFriendRequestSentByUser,
  getFriends,
  getMessagesByConversation,
  getUser,
  sendFriendRequest,
  sendMessage,
} from "../controllers/user.js";
import { verifyUser } from "../utils/verifyToken.js";

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

// ---------------------  POST ---------------------

// Friend Requests
router.post("/sendFriendRequest/:id", verifyUser, sendFriendRequest);
router.post("/acceptFriendRequest/:id", verifyUser, acceptFriendRequest);

// Conversation
router.post("createConversation/:id", verifyUser, createConversation);
router.post("sendMessage/:id", verifyUser, sendMessage);

// ---------------------  UPDATE ---------------------

// ---------------------  DELETE ---------------------
// Friend Requests
router.delete("/declineFriendRequest/:id", verifyUser, declineFriendRequest);
router.delete("/deleteFriend/:id", verifyUser, deleteFriend);
router.delete("/deleteFriendRequest/:id", verifyUser, deleteFriendRequest);

// ---------------------  PATCH ---------------------

export default router;
