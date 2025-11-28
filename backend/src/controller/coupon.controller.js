import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "coupon not found" });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    console.log("error in get coupon", error.message);
    return res.status(500).json({
      sucess: false,
      message: "internal server error in get coupon",
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const couponCode = req.body;

    const coupon = await Coupon.findOne({
      code: couponCode,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "coupon not found" });
    }
    if (coupon.expirationDate < Date.now) {
      coupon.isActive = false;
      await coupon.save();
      return res
        .status(404)
        .json({ success: false, message: "coupon has expired" });
    }
    return res.status(200).json({
      success: true,
      message: "coupon is valid",
      code: coupon.code,
      discount: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("error in validate coupon", error.message);
    return res.status(500).json({
      sucess: false,
      message: "internal server error in validate coupon",
    });
  }
};

export const findCoupon=async(couponCode,userId)=>{
  try {
    const coupon=null
   coupon  = await Coupon.findOne({
      code: couponCode,
      userId,
      isActive: true,
    })
    return coupon
    
    
  } catch (error) {
    throw error
    
  }
}