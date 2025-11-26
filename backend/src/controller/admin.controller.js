import User from "../models/user.model";

export const updateVendorStatus = async (req, res) => {
  try {
    const { id:vendorId } = req.params;
    const { status } = req.body;
    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== "vendor") {
      return res
        .status(404)
        .json({ success: false, message: "vendor not found" });
    }
    vendor.status = status;
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
        error: error.message,
      });
  }
};

export const getPendingVendors = async (req, res) => {
  try {
    const pendingVendors = await User.find({
      role: "vendor",
      status: "pending",
    }).select("-password -__v -createdAt -updatedAt");
    if (pendingVendors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no pending vendors found" });
    }
    res.status(200).json({ success: true, pendingVendors });
  } catch (error) {
    console.error("error in getPendingVendors controller", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error",
        error: error.message,
      });
  }
};
