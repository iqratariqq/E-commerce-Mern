import express from "express";
import { isAdmin, isVendor, protectRoute } from "../middelware/auth.middelware.js";
import {
  getAnalytics,
  getDailySalesData,
  getKitchenSalesData,
} from "../controller/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, isAdmin, async (req, res) => {
  try {
    const kitchenId=req.params.kitchen._id
    const analyticsData = await getAnalytics();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const salesData = await getDailySalesData(kitchenId, startDate, endDate);
    res.status(200).json({ success: true, analyticsData, salesData });
  } catch (error) {
    console.error("error in analyticsData route ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error?.message,
    });
  }


});


router.get("/:id", protectRoute, isVendor,getKitchenSalesData )
export default router;
