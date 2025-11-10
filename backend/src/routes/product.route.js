import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware.js";
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


router.post("/", protectRoute, isAdmin, addProduct);
router.put("/:id", protectRoute, isAdmin, updateProduct);
router.patch("/:id", protectRoute, isAdmin,toggleFeaturedroduct);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);


export default router;
