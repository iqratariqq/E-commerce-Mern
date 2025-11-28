import express from "express";
import {

  isVendor,
  protectRoute,
} from "../middelware/auth.middelware.js";
import { deleteKitchenById, getAllKitchen, registerKitchen, updateKitchen, updateKitchenStatus } from "../controller/kitchen.controller.js";

import upload from "../middelware/multer.middelware.js";
const router = express.Router();


router.get("/", protectRoute, getAllKitchen );
router.post("/register-kitchen",protectRoute,isVendor,upload.single('kitchenImage'),registerKitchen);
router.patch("/:id", protectRoute, isVendor, updateKitchenStatus);
router.put("/:id", protectRoute, isVendor,upload.single('kitchenImage'), updateKitchen);
router.delete("/:id", protectRoute, isVendor, deleteKitchenById);

export default router;