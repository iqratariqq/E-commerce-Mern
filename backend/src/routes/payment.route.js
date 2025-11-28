import express from "express"
import { protectRoute } from "../middelware/auth.middelware.js";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";


const router=express.Router();

router.post("/create-checkout-session",protectRoute,createCheckoutSession)

router.get("/checkout-success",protectRoute,checkoutSuccess)

export default router