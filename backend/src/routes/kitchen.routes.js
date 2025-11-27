import express from "express";
import {
  isAdmin,
  isVendor,
  protectRoute,
} from "../middelware/auth.middelware.js";
import { deleteKitchenById, getAllKitchen, updateKitchenStatus } from "../controller/kitchen.controller.js";
const router = express.Router();

router.get("/", protectRoute, isVendor,getAllKitchen );

//all users can access featured products
router.get("/featured-products", getFeaturedMenu);
router.get("/category-products/:category", getCategoryMenu);
router.get("/recommended-products", getRecommendedMenu);

router.post(
  "/",
  protectRoute,
  isVendor,
  upload.single("productImage"),
  addMenu
);
router.put("/:id", protectRoute, isVendor, updateMenu);
router.patch("/:id", protectRoute, isVendor, updateKitchenStatus);
router.delete("/:id", protectRoute, isVendor, deleteKitchenById);

export default router;