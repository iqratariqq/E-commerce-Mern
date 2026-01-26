import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken, refreshTokenGenerate, setAccessCookies, setRefreshCookies, storeRefreshTokeninRedis } from "../Utils/generateTokenandSetCookies.js";

export const updateVendorStatus = async (req, res) => {
  try {
    const { id:vendorId } = req.params;
    console.log("vendorId:", vendorId);
    const { status } = req.body;
    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== "vendor") {
      return res
        .status(404)
        .json({ success: false, message: "vendor not found" });
    }
    vendor.requestStatus = status;
    await vendor.save();
    res
      .status(200)
      .json({
        success: true,
        message: "vendor status updated successfully",
        vendor,
      });
  } catch (error) {
    console.error("error in updateVendorStatus controller", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error",
        error: error.message
      });
  }
}

export const getPendingVendors = async (req, res) => {
  try {
    const pendingVendors = await User.find({
      role: "vendor",
      requestStatus: "pending",
    }).select("-password -__v -createdAt -updatedAt")
    if (pendingVendors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no pending vendors found" });
    }
    res.status(200).json({ success: true, pendingVendors })
  } catch (error) {
    console.error("error in getPendingVendors controller", error)
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error",
        error: error.message,
      });
  }
};


//delete admin controller after testing
export const addAdmin=async(req,res)=>{
  const{userName,email,password}=req.body
  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const admin=await User.create({
      userName,
      email,
      password: hashPassword,
      phoneNumber:"03478908888",
      requestStatus:"active",
      role:"admin"
    })
       const refreshToken = refreshTokenGenerate(admin._id);
        const accessToken = generateAccessToken(admin._id);
        await storeRefreshTokeninRedis(refreshToken);
        setRefreshCookies(res, refreshToken);
        setAccessCookies(res, accessToken);
    res.status(201).json({success:true,message:"admin created successfully",admin})
  } catch (error) {
    console.error("error in addAdmin controller", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error",
        error: error.message,
      });
  }
}
