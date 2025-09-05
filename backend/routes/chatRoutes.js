const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {
  createChat,
  getChats,
  getChatMessages,
  getSharedChat,
  getSharedChatWithUser,
  updateChat,
  deleteChat,
} = require("../controller/chatController");

router.post("/", isLoggedIn, createChat);
router.get("/", isLoggedIn, getChats);
router.get("/:chatId/messages", isLoggedIn, getChatMessages);
router.get("/:chatId/shared", getSharedChat); // Public route for shared chats
router.get("/:chatId/shared/:userId", getSharedChatWithUser); // Public route with user validation
router.put("/:chatId", isLoggedIn, updateChat);
router.delete("/:chatId", isLoggedIn, deleteChat);

module.exports = router;
