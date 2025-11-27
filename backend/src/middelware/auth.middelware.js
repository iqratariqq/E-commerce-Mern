import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User  from "../models/user.model.js";

//looking for access token in cookies
export const protectRoute = async (req, res, next) => {
  try {
    const accesssToken = req.cookies.accessToken;
    if (!accesssToken) {
      return res.status(401).json({success:false, message: "No access token found" });
    }
    //verify token
    const decode = jwt.verify(
      accesssToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    if (!decode) {
      return res.status(404).json({success:false, message: "Invalid access token" });
    }

    const user = await User.findById(decode.userID).select(
      "-password -__v -createdAt -updatedAt"
    );
 
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found by userID in token " });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("error in protect route middleware", error);
    return res.status(401).json({ message: "Invalid access token" });
  }
};

//checking for admin role
export const isVendor = (req, res, next) => {
    try {
        if (req.user?.role === "vendor" && req.user?.requestStatus==="active" ) {
            return next();
        }
        return res.status(403).json({ success: false, message: "Forbidden: Vendors only" });
    } catch (error) {
        console.error("error in isVendor middleware", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (req.user?.role === "admin" ) {
            return next();
        }
        return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    } catch (error) {
        console.error("error in isAdmin middleware", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const isCustomer = (req, res, next) => {
    try {
        if (req.user?.role === "customer" ) {
            return next();
        }
        return res.status(403).json({ success: false, message: "Forbidden: Customers only" });
    } catch (error) {
        console.error("error in isCustomer middleware", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}