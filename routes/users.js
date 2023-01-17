import express from "express";
import {
  acceptFriendRequest,
  createConversation,
  declineFriendRequest,
  deleteFriend,
  getConversation,
  getConversationsByUser,
  getFriendList,
  getFriendRequestReceivedByUser,
  getFriendRequestSent,

  getMessagesByConversation,
  getUser,
  getUserById,
  sendFriendRequest,
  sendMessage,
} from "../controllers/user.js";

const router = express.Router();

// ---------------------  GET ---------------------
router.get("/me", getUser);
router.get("/finduser/:id", getUserById);
router.get("/friendslist", getFriendList);
// Friend Requests


router.get(
  "/friendrequestsRecieved",
  getFriendRequestReceivedByUser
);

router.get("/friendrequestsSent", getFriendRequestSent);

// Conversation
router.get("/conversations", getConversationsByUser);
router.get("/conversations/:id", getConversation);
router.get(
  "/messagesByConversation/:id",
  getMessagesByConversation
);

// ---------------------  POST ---------------------

// Friend Requests
router.post("/sendFriendRequest/:id", sendFriendRequest);
router.post("/acceptFriendRequest/:id", acceptFriendRequest);

// Conversation
router.post("/createConversation", createConversation);
router.post("/sendMessage/:id", sendMessage);

// ---------------------  UPDATE ---------------------

// ---------------------  DELETE ---------------------
// Friend Requests
router.delete("/declineFriendRequest/:id", declineFriendRequest);
router.delete("/deleteFriend/:id", deleteFriend);

// ---------------------  PATCH ---------------------

export default router;
