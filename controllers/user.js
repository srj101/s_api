import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";
import { createError } from "../utils/error.js";

// @route GET api/auth/user/me
export const getUser = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    throw createError("User does not exist", 400);
  }
  res.status(200).json({ user });
};

// Send Friend Request
export const sendFriendRequest = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw createError("User does not exist", 400);
  }
  const friendRequest = await prisma.friendRequest.create({
    data: {
      senderId: userId,
      receiverId: id,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to accept friend request
export const acceptFriendRequest = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
  });
  if (!friendRequest) {
    throw createError("Friend request does not exist", 400);
  }
  const friend = await prisma.friend.create({
    data: {
      userId: friendRequest.senderId,
      friendId: friendRequest.receiverId,
    },
  });
  res.status(200).json({ friend });
};

// Route to decline friend request
export const declineFriendRequest = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
  });
  if (!friendRequest) {
    throw createError("Friend request does not exist", 400);
  }
  const deletedFriendRequest = await prisma.friendRequest.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ deletedFriendRequest });
};

// Route to get friends
export const getFriends = async (req, res, next) => {
  const { userId } = req.user;
  const friends = await prisma.friend.findMany({
    where: {
      userId,
    },
    include: {
      friend: true,
    },
  });
  res.status(200).json({ friends });
};

// Route to get friend requests
export const getFriendRequests = async (req, res, next) => {
  const { userId } = req.user;
  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
  res.status(200).json({ friendRequests });
};

// Route to get sent friend requests
export const getSentFriendRequests = async (req, res, next) => {
  const { userId } = req.user;
  const sentFriendRequests = await prisma.friendRequest.findMany({
    where: {
      senderId: userId,
    },
    include: {
      receiver: true,
    },
  });
  res.status(200).json({ sentFriendRequests });
};

// Route to get friend
export const getFriend = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friend = await prisma.friend.findUnique({
    where: {
      id,
    },
    include: {
      friend: true,
    },
  });
  res.status(200).json({ friend });
};

// Route to delete friend
export const deleteFriend = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friend = await prisma.friend.findUnique({
    where: {
      id,
    },
    include: {
      friend: true,
    },
  });
  if (!friend) {
    throw createError("Friend does not exist", 400);
  }
  const deletedFriend = await prisma.friend.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ deletedFriend });
};

// Route to get all friend requests sent

export const getFriendRequestsSent = async (req, res, next) => {
  const { userId } = req.user;
  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      senderId: userId,
    },
    include: {
      receiver: true,
    },
  });
  res.status(200).json({ friendRequests });
};

// Route to get all friend requests received
export const getFriendRequestsReceived = async (req, res, next) => {
  const { userId } = req.user;
  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
  res.status(200).json({ friendRequests });
};

// Route to get a friend request
export const getFriendRequest = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to delete a friend request
export const deleteFriendRequest = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
  });
  if (!friendRequest) {
    throw createError("Friend request does not exist", 400);
  }
  const deletedFriendRequest = await prisma.friendRequest.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ deletedFriendRequest });
};

// Route to get all friend requests sent by a user
export const getFriendRequestSent = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to get all friend requests received by a user
export const getFriendRequestReceived = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to get all friend requests sent by a user
export const getFriendRequestSentByUser = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to get a friend request received by a user
export const getFriendRequestReceivedByUser = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });
  res.status(200).json({ friendRequest });
};

// Route to start a conversation
export const createConversation = async (req, res, next) => {
  const { userId } = req.user;
  const { participants } = req.body;
  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        connect: [
          {
            userId,
          },
          {
            userId: participants,
          },
        ],
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
  res.status(200).json({ conversation });
};

// Route to get all conversations
export const getConversationsByUser = async (req, res, next) => {
  const { userId } = req.user;
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
  res.status(200).json({ conversations });
};

// Route to get a conversation
export const getConversation = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const conversation = await prisma.conversation.findUnique({
    where: {
      id,
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
  res.status(200).json({ conversation });
};

// Route to get all messages
export const getMessagesByConversation = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const messages = await prisma.message.findMany({
    where: {
      conversationId: id,
    },
    include: {
      sender: true,
    },
  });
  res.status(200).json({ messages });
};

// Route to get all messages sent by a user
export const getMessagesByUser = async (req, res, next) => {
  const { userId } = req.user;
  const messages = await prisma.message.findMany({
    where: {
      senderId: userId,
    },
    include: {
      sender: true,
    },
  });
  res.status(200).json({ messages });
};

// Route to send a message
export const sendMessage = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { message } = req.body;
  const conversation = await prisma.conversation.findUnique({
    where: {
      id,
    },
  });
  if (!conversation) {
    throw createError("Conversation does not exist", 400);
  }
  const newMessage = await prisma.message.create({
    data: {
      message,
      senderId: userId,
      conversationId: id,
    },
    include: {
      sender: true,
    },
  });
  res.status(200).json({ newMessage });
};

// Route to get all posts
export const getPostsByUser = async (req, res, next) => {
  const { userId } = req.user;
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
    },
  });
  if (!posts) {
    throw createError("No posts found", 400);
  }
  res.status(200).json({ posts });
};

// Route to get a post
export const getPost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      community: true,
    },
  });

  if (!post) {
    throw createError("Post does not exist", 400);
  }
  res.status(200).json({ post });
};

// Route to create a post
export const createPost = async (req, res, next) => {
  const { userId } = req.user;
  const { title, content, communityId } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
      communityId,
    },
    include: {
      author: true,
      community: true,
    },
  });

  if (!post) {
    throw createError("Post does not exist", 400);
  }
  res.status(200).json({ post });
};

// Route to update a post
export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw createError("Post does not exist", 400);
  }

  res.status(200).json({ post });
};

// Route to delete a post
export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const post = await prisma.post.delete({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
};

// Route to get all comments
export const getCommentsByPost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const comments = await prisma.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      author: true,
    },
  });

  if (!comments) {
    throw createError("No comments found", 400);
  }
  res.status(200).json({ comments });
};

// Route to community posts by user
export const getCommunityPostsByUser = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const posts = await prisma.post.findMany({
    where: {
      communityId: id,
      userId,
    },
    include: {
      author: true,
      community: true,
    },
  });

  if (!posts) {
    throw createError("No posts found", 400);
  }

  res.status(200).json({ posts });
};
