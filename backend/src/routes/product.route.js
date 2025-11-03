import express from "express";
import { isAdmin, protectRoute } from "../middelware/auth.middelware.js";
import {
  addProduct,
  deleteProduct,
  getFeaturedProducts,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";
const router = express.Router();

router.get("/", protectRoute, isAdmin, getProducts);

//all users can access featured products
router.get("/featured-products", getFeaturedProducts);

router.post("/add-product", protectRoute, isAdmin, addProduct);
router.put("/updtae-product", protectRoute, isAdmin, updateProduct);
router.delete("/delete-rpoduct", protectRoute, isAdmin, deleteProduct);

export default router;
