const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("../routes/authRoutes");
const chatRoutes = require("../routes/chatRoutes");
const cors = require("cors");
// middlewares

app.use(
  cors({
    origin: ["http://localhost:5173", "https://navi20.vercel.app"], // Add your Vercel URL here
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
module.exports = app;
