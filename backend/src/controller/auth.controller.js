import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenandSetCookies } from "../Utils/generateTokenandSetCookies.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }
    const alreadyExit = await User.findOne({ email });
    if (alreadyExit) {
      return res
        .status(409)
        .json({ success: false, message: "user already exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 6);
    const user = new User({
      userName,
      email,
      password:hashPassword,
    });
    await user.save();

    generateTokenandSetCookies(res, user._id);

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
