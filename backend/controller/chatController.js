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

    // Format the response to include user ID as string
    const formattedChat = {
      _id: newChat._id,
      title: newChat.title,
      user: newChat.user.toString(), // Convert ObjectId to string
      lastActivity: newChat.lastActivity,
      createdAt: newChat.createdAt,
      updatedAt: newChat.updatedAt,
    };

    return res
      .status(201)
      .json({ message: "Chat created successfully", chat: formattedChat });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getChats(req, res) {
  try {
    const user = req.user;
    const chats = await chatModel.find({ user: user._id });

    // Format chats to include user ID
    const formattedChats = chats.map((chat) => ({
      _id: chat._id,
      title: chat.title,
      user: chat.user.toString(), // Convert ObjectId to string
      lastActivity: chat.lastActivity,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    return res.status(200).json({ chats: formattedChats });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function updateChat(req, res) {
  try {
    const user = req.user;
    const { chatId } = req.params;
    const { title } = req.body;

    // Ensure the chat belongs to the user
    const chat = await chatModel.findOne({ _id: chatId, user: user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Update the chat title
    const updatedChat = await chatModel.findByIdAndUpdate(
      chatId,
      { title },
      { new: true }
    );

    return res.status(200).json({
      message: "Chat updated successfully",
      success: true,
      chat: updatedChat,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

async function deleteChat(req, res) {
  try {
    const user = req.user;
    const { chatId } = req.params;

    // Ensure the chat belongs to the user
    const chat = await chatModel.findOne({ _id: chatId, user: user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Delete all messages in the chat
    await messageModel.deleteMany({ chat: chatId });

    // Delete the chat
    await chatModel.findByIdAndDelete(chatId);

    return res.status(200).json({
      message: "Chat deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  createChat,
  getChats,
  getChatMessages,
  getSharedChat,
  getSharedChatWithUser,
  updateChat,
  deleteChat,
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

    return res.status(200).json({
      messages,
      isOwner: true,
      chat: {
        id: chat._id,
        title: chat.title,
        user: chat.user.toString(), // Convert ObjectId to string
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

// Get shared chat (public access, no ownership required)
async function getSharedChat(req, res) {
  try {
    const { chatId } = req.params;

    // Find the chat without user validation (public access)
    const chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean();

    // Check if current user is the owner (if authenticated)
    const isOwner = req.user
      ? chat.user.toString() === req.user._id.toString()
      : false;

    return res.status(200).json({
      messages,
      chat: {
        id: chat._id,
        title: chat.title,
        user: chat.user.toString(), // Convert ObjectId to string
      },
      isOwner,
    });
  } catch (error) {
    console.error("Error in getSharedChat:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

// Get shared chat with user ID validation
async function getSharedChatWithUser(req, res) {
  try {
    const { chatId, userId } = req.params;

    // Find the chat and verify it belongs to the specified user
    const chat = await chatModel.findOne({ _id: chatId, user: userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found or not shared" });
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      messages,
      chat: {
        id: chat._id,
        title: chat.title,
        user: chat.user.toString(), // Convert ObjectId to string
      },
    });
  } catch (error) {
    console.error("Error in getSharedChatWithUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
