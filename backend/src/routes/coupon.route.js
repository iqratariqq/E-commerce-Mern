
import express from "express"
import { protectRoute } from "../middelware/auth.middelware";
import { getCoupon, validateCoupon } from "../controller/coupon.controller";

const router=express.Router();

router.get("/",protectRoute,getCoupon)
router.get("/validate",protectRoute,validateCoupon)

export default router