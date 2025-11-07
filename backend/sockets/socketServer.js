const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { generateAIResponse, generateVectors } = require("../service/aiService");
const messageModel = require("../models/messageModel");
const { createMemory, queryMemory } = require("../service/vectorService");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://navi20.vercel.app",
        "http://localhost:4173",
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authentication error"));
    }
    try {
      const decode = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ _id: decode.id });
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("ai-message", async (messagePayload) => {
      /*
      const message = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });

      const messageVectors = await generateVectors(messagePayload.content);

      */

      const [message, messageVectors] = await Promise.all([
        await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        }),
        await generateVectors(messagePayload.content),
      ]);

      const messageMemory = await queryMemory({
        queryVector: messageVectors,
        limit: 5,
        metadata: {
          user: socket.user._id,
        },
      });

      console.log(messageMemory);

      await createMemory({
        vectors: messageVectors,
        metadata: {
          user: socket.user._id,
          chat: messagePayload.chat,
          text: messagePayload.content,
        },
        messageId: message._id,
      });

      const chatHistory = (
        await messageModel
          .find({
            chat: messagePayload.chat,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `
            these are the previous messages from the chat, use them to generate a response ${messageMemory
              .map((item) => item.metadata.text)
              .join("\n")}
            `,
            },
          ],
        },
      ];

      const userId = socket.user._id;

      const response = await generateAIResponse([...ltm, ...stm], userId);

      /*
      const responseMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const responseVectors = await generateVectors(response);
      */

      socket.emit("ai-response", {
        chat: messagePayload.content,
        content: response,
      });

      const [responseMessage, responseVectors] = await Promise.all([
        await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: response,
          role: "model",
        }),
        await generateVectors(response),
      ]);

      await createMemory({
        vectors: responseVectors,
        metadata: {
          user: socket.user._id,
          chat: messagePayload.chat,
          text: response,
        },
        messageId: responseMessage._id,
      });
    });
  });
}

module.exports = {
  initSocketServer,
};
