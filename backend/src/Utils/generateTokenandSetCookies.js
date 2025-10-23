import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const generateTokenandSetCookies = (res, userID) => {
  try {
    const Token = jwt.sign({ userID }, process.env.NODE_ENV, {
      expiresIn: "7d",
    });

    res.cookie("token", Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return Token
  } catch (error) {
    console.error("error in generation of token",error)
    throw new Error;
  }
};
