const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  try {
    const isAlreadyExists = await userModel.findOne({ email });
    if (isAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function giveAiAssistantName(req, res) {
  try {
    const { aiAssistantName } = req.body;
    const userId = req.user._id;

    // Validate input
    if (
      !aiAssistantName ||
      typeof aiAssistantName !== "string" ||
      aiAssistantName.trim().length === 0
    ) {
      return res.status(400).json({ message: "Assistant name is required" });
    }

    if (aiAssistantName.trim().length > 30) {
      return res
        .status(400)
        .json({ message: "Assistant name must be 30 characters or less" });
    }

    // Update the user's assistant name
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { aiAssistantName: aiAssistantName.trim() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Assistant name updated successfully",
      aiAssistantName: updatedUser.aiAssistantName,
    });
  } catch (error) {
    console.error("Error updating assistant name:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email or Password is incorrect" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "Email or Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(200).json({ message: "User logged in successfully" });
}

async function getCurrentUser(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      user: {
        id: user._id,
        name: `${user.fullName.firstName} ${user.fullName.lastName}`,
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
        email: user.email,
        aiAssistantName: user.aiAssistantName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function logoutUser(req, res) {
  try {
    // Clear the httpOnly cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  giveAiAssistantName,
  getCurrentUser,
  logoutUser,
};
