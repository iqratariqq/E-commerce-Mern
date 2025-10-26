import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { redis } from "./redis.js";

export const setRefreshCookies = (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("error in setting cookie for refresh token", error);
    throw new Error();
  }
};

export const setAccessCookies = (res, accessToken) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    console.error("error in setting cookie for accees token", error);
    throw new Error();
  }
};

export const generateAccessToken = (userID) => {
  try {
    const accessToken = jwt.sign(
      { userID },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
      }
    );

    return accessToken;
  } catch (error) {
    console.error("error in generation  of access token", error);
    throw new Error();
  }
};

export const refreshTokenGenerate = (userID) => {
  try {
    const refreshToken = jwt.sign(
      { userID },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
      }
    );
    return refreshToken;
  } catch (error) {
    console.error("error in generation of refresh token", error);
    throw new Error();
  }
};

export const storeRefreshTokeninRedis = async (userID, refreshToken) => {
  try {
    await redis.set(
      `refreshToken:${userID}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );
  } catch (error) {
    console.error("error in storing refresh token in redis", error);
    throw new Error();
  }
};
