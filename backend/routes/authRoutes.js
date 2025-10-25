const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  giveAiAssistantName,
  getCurrentUser,
  logoutUser,
} = require("../controller/authController");
const { isLoggedIn } = require("../middleware/isLoggedIn");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedIn, logoutUser);
router.post("/give-ai-assistant-name", isLoggedIn, giveAiAssistantName);
router.get("/me", isLoggedIn, getCurrentUser);
module.exports = router;
