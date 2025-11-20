import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware";
import { getAnalytics } from "../controller/analytics.controller";

const router = express.Router();

router.get("/", protectRoute, isAdmin, async (req, res) => {
  try {
    const analyticsData = await getAnalytics();
    res.status(200).json({ success: true, analyticsData });
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
