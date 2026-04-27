import express from "express";
import { isAdmin, isVendor, protectRoute } from "../middelware/auth.middelware.js";
import {
  getAnalytics,
  getDailySalesData,
  getKitchenSalesData,
} from "../controller/analytics.controller.js";
import { getVendorKitchenId } from "../controller/kitchen.controller.js";

const router = express.Router();

router.get("/", protectRoute, isVendor, async (req, res) => {
  try {
    const kitchenId=await getVendorKitchenId(req.user._id);
  
    const analyticsData = await getAnalytics();
    console.log("analytics data in route",analyticsData)
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const salesData = await getDailySalesData(kitchenId, startDate, endDate);
    console.log("sales data in analytics route", salesData);
    return res.status(200).json({ success: true, analyticsData, salesData });
  } catch (error) {
    console.error("error in analyticsData route ", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error?.message,
    });
  }


});


router.get("/:id", protectRoute, isVendor,getKitchenSalesData )
export default router;
