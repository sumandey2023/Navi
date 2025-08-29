const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { createChat } = require("../controller/chatController");

router.post("/", isLoggedIn, createChat);

module.exports = router;
