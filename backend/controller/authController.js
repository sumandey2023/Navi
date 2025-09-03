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
      sameSite: "lax",
      secure: false,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function giveAiAssistantName(req, res) {
  const { aiAssistantName } = req.body;
  const userId = req.user._id;

  try {
    await userModel.findByIdAndUpdate(userId, { aiAssistantName });
    res.status(200).json({ message: "Assistant name added successfully" });
  } catch (error) {
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
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ message: "User logged in successfully" });
}

module.exports = { registerUser, loginUser, giveAiAssistantName };
