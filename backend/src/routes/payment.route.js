import express from "express"
import { isCustomer, isVendor, protectRoute } from "../middelware/auth.middelware.js";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";


const router=express.Router();

router.post("/create-checkout-session",protectRoute,createCheckoutSession)

router.post("/checkout-success",protectRoute,checkoutSuccess)





export default router