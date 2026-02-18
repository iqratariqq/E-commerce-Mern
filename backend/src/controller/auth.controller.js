import User from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  refreshTokenGenerate,
  setAccessCookies,
  setRefreshCookies,
  storeRefreshTokeninRedis,
} from "../Utils/generateTokenandSetCookies.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { redis } from "../Utils/redis.js";

// register controller

export const signup = async (req, res) => {
  const { role } = req.params;

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
    const alreadyExit = await User.findOne({ email }).lean();
    if (alreadyExit) {
      return res
        .status(409)
        .json({
          success: false,
          message: "user already exist,try another email",
        });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      userName,
      email,
      password: hashPassword,
      role: role === "vendor" ? "vendor" : "customer",
      requestStatus: role === "vendor" ? "pending" : "active",
    });
    await user.save();

    const refreshToken = refreshTokenGenerate(user._id);
    const accessToken = generateAccessToken(user._id);
    await storeRefreshTokeninRedis(user._id, refreshToken);
    setRefreshCookies(res, refreshToken);
    setAccessCookies(res, accessToken);

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ succuss: false, message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ succuss: false, message: "invalid email" });
    }

    const userhashPassword = await bcryptjs.compare(password, user.password);
    if (!userhashPassword) {
      {
        return res
          .status(400)
          .json({ succuss: false, message: "invalid password" });
      }
    }
    if (user.requestStatus !== "active") {
      return res
        .status(403)
        .json({
          success: false,
          message: "your account is not active, please contact to admin",
        });
    }

    const refreshToken = refreshTokenGenerate(user._id);
    const accessToken = generateAccessToken(user._id);
    await storeRefreshTokeninRedis(user._id, refreshToken);
    setRefreshCookies(res, refreshToken);
    setAccessCookies(res, accessToken);

    return res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {}
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh token" });
    }
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
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
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error?.message,
    });
  }
};

// basically it refresh the access token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
 
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "no refresh token" });
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
    );

    if (!decode || !decode.userID) {
      return res
        .status(401)
        .json({
          success: false,
          message: "unauthorized, invalid refresh token",
        });
    }
    const storedRefreshToken = await redis.get(`refreshToken:${decode.userID}`);
  

    if (storedRefreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message:
          "unauthorized, invalid refresh token,token not match with redis token",
      });
    }

    // generate new access token
    const accessToken = generateAccessToken(decode.userID);
    setAccessCookies(res, accessToken);
    res.status(200).json({ message: "access token refreshed successfully" });
  } catch (error) {
    console.error("error in refreshing access token", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error?.message,
    });
  }
};
