import express from "express"
import { isCustomer, protectRoute } from "../middelware/auth.middelware.js";
import { checkout, checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";


const router=express.Router();

router.post("/create-checkout-session",protectRoute,createCheckoutSession)

router.get("/checkout-success",protectRoute,checkoutSuccess)

router.post("/checkout", protectRoute, isCustomer,checkout);

export default router