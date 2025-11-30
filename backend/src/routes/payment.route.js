import express from "express"
import { isCustomer, isVendor, protectRoute } from "../middelware/auth.middelware.js";
import { checkout, checkoutSuccess, createCheckoutSession, getUserOrders, markOrderAsDelivered } from "../controller/payment.controller.js";


const router=express.Router();

router.post("/create-checkout-session",protectRoute,createCheckoutSession)

router.get("/checkout-success",protectRoute,checkoutSuccess)

router.post("/checkout", protectRoute, isCustomer,checkout);
router.patch("/mark-order-delivered/:orderId",protectRoute,isVendor,markOrderAsDelivered);
router.get("/",protectRoute,isVendor,getUserOrders);


export default router