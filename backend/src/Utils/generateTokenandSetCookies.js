import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { redis } from "./redis.js";

export const setCookies = (res, refreshToken,accessToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

        res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    console.error("error in setting cookie for refresh token", error);
    throw new Error();
  }
};

export const generateTokens = (userID) => {
  try {
    const accessToken = jwt.sign(
      { userID },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
      }
    );

    const refreshToken = jwt.sign(
      { userID },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d",
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("error in generation of token", error);
    throw new Error();
  }
};

export const storeRefreshTokeninRedis=async(userID, refreshToken)=>{
  try {
await redis.set(`refreshToken:${userID}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

    
  } catch (error) {
        console.error("error in storing refresh token in redis", error);
    throw new Error();
  }
}

