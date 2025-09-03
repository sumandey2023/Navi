const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { createChat, getChats } = require("../controller/chatController");

router.post("/", isLoggedIn, createChat);
router.get("/", isLoggedIn, getChats);

module.exports = router;
