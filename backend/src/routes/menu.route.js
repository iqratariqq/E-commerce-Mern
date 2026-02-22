import express from "express";
import {
    isVendor,
  protectRoute,
} from "../middelware/auth.middelware.js";
import {
  addMenu,
  deleteMenu,
  getCategoryMenu,
  getFeaturedMenu,
  getKitchenMenu,
  getRecommendedMenu,
  toggleFeaturedMenu,
  updateMenu,
} from "../controller/menu.controller.js";
import upload from "../middelware/multer.middelware.js";
const router = express.Router();

router.get("/", protectRoute, getKitchenMenu);

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
router.patch("/:id", protectRoute, isVendor, toggleFeaturedMenu);
router.delete("/:id", protectRoute, isVendor, deleteMenu);

export default router;
