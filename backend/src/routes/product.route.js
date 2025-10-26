import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware.js";
import {
  addProduct,
  getFeaturedProducts,
  getProducts,
} from "../controller/product.controller.js";
const router = express.Router();

router.get("/", protectRoute, isAdmin, getProducts);
//all users can access featured products
router.get("/featured-products", getFeaturedProducts);

router.post("/add-product", protectRoute, isAdmin, addProduct);

export default router;
