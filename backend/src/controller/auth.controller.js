import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {
  generateTokens,
  setCookies,
  storeRefreshTokeninRedis,
} from "../Utils/generateTokenandSetCookies.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { redis } from "../Utils/redis.js";

// register controller

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
      password: hashPassword,
    });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshTokeninRedis(refreshToken);
    setCookies(res, refreshToken, accessToken);

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


export const logout = async (req, res) => {

  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh token" });
    }
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    if (!decode || !decode.userID) {
      return res
        .status(401)
        .json({ message: "unauthorized, invalid refresh token" });
    }
    await redis.del(`refreshToken:${decode.userID}`);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.error("error in logout", error);
    res
      .status(500)
      .json({
        success: false,
        message: "internal server error",
        error: error?.message,
      });
  }
};
