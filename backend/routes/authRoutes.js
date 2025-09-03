const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  giveAiAssistantName,
  getCurrentUser,
} = require("../controller/authController");
const { isLoggedIn } = require("../middleware/isLoggedIn");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/give-ai-assistant-name", giveAiAssistantName);
router.get("/me", isLoggedIn, getCurrentUser);
module.exports = router;
