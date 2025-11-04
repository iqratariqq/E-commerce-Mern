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

router.post("/", protectRoute, isAdmin, addProduct);
router.patch("/:id", protectRoute, isAdmin, updateProduct);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);

export default router;
