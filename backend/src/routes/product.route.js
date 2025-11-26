import express from "express";
import {  isVender, protectRoute } from "../middelware/auth.middelware.js";
import {
  addProduct,
  deleteProduct,
  getCategoryProducts,
  getFeaturedProducts,
  getProducts,
  getRecommendedProducts,
  toggleFeaturedroduct,
  updateProduct,
} from "../controller/product.controller.js";
const router = express.Router();

router.get("/", protectRoute, isAdmin, getProducts);

//all users can access featured products
router.get("/featured-products", getFeaturedProducts);
router.get("/category-products/:category", getCategoryProducts);
router.get("/recommended-products", getRecommendedProducts);


router.post("/", protectRoute, isVendor, addProduct);
router.put("/:id", protectRoute, isVendor, updateProduct);
router.patch("/:id", protectRoute, isVendor,toggleFeaturedroduct);
router.delete("/:id", protectRoute, isVendor, deleteProduct);

export default router;
