const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {
  createChat,
  getChats,
  getChatMessages,
} = require("../controller/chatController");

router.post("/", isLoggedIn, createChat);
router.get("/", isLoggedIn, getChats);
router.get("/:chatId/messages", isLoggedIn, getChatMessages);

module.exports = router;
