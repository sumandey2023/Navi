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

module.exports = {
  createChat,
};
