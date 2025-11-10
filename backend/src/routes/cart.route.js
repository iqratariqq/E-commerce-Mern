import express from "express"
import router from "./product.route";
import { protectRoute } from "../middelware/auth.middelware";
import { getCartItems } from "../controller/cart.controller";

const Route=express.Router();

router.get("/",protectRoute,getCartItems)
