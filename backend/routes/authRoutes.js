const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  giveAiAssistantName,
} = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/give-ai-assistant-name", giveAiAssistantName);
module.exports = router;
