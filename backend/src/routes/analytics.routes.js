import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware";
import {
  getAnalytics,
  getDailySalesData,
} from "../controller/analytics.controller";

const router = express.Router();

router.get("/", protectRoute, isAdmin, async (req, res) => {
  try {
    const analyticsData = await getAnalytics();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const salesData = await getDailySalesData(startDate, endDate);

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

export default router;
