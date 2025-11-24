import express from "express"
import { protectRoute } from "../middelware/auth.middelware";


const router=express.Router();

router.post("/create-checkout-session",protectRoute,)



export default router