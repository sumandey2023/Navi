const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;
  try {
    const newChat = await chatModel.create({
      user: user._id,
      title,
    });
    return res
      .status(201)
      .json({ message: "Chat created successfully", chat: newChat });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getChats(req, res) {
  try {
    const user = req.user;
    const chats = await chatModel.find({ user: user._id });
    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  createChat,
  getChats,
  getChatMessages,
};

async function getChatMessages(req, res) {
  try {
    const user = req.user;
    const { chatId } = req.params;

    // Ensure the chat belongs to the user
    const chat = await chatModel.findOne({ _id: chatId, user: user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
