import express  from "express"
import { protectRoute } from "../middelware/auth.middelware.js";
import { isKitchenRegistered } from "../controller/kitchen.controller.js";

const router = express.Router();


router.get("/",protectRoute,isKitchenRegistered)

export default router;