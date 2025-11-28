import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware.js";
import { getPendingVendors, updateVendorStatus } from "../controller/admin.controller.js";


const router = express.Router();

router.get("/", protectRoute, isAdmin,getPendingVendors )
router.patch("/update-vendor/:id",protectRoute,isAdmin,updateVendorStatus)

export default router;