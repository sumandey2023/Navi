const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("../routes/authRoutes");
const chatRoutes = require("../routes/chatRoutes");
const cors = require("cors");
// middlewares

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://navi20.vercel.app",
      "https://navi-chat.vercel.app",
      "http://localhost:4173",
      "https://navi20-new.vercel.app",
      process.env.FRONTEND_URL, // Add this to your environment variables
    ].filter(Boolean), // Remove any undefined values
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    url: req.originalUrl,
  });
});

module.exports = app;
