const chatModel = require("../models/chatModel");

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
};
