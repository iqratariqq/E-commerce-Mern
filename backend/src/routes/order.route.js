import express from "express"
import {  isVendor, protectRoute } from "../middelware/auth.middelware.js";
import {  getUserOrders, markOrderAsDelivered } from "../controller/payment.controller.js";


const router=express.Router();

router.patch("/mark-order-delivered/:orderId",protectRoute,isVendor,markOrderAsDelivered);
router.get("/",protectRoute,isVendor,getUserOrders);


export default router