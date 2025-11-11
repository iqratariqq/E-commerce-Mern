import express from "express";

import { protectRoute } from "../middelware/auth.middelware.js";
import {
  addtoCart,
  getCartItems,
  removeAllItem,
  updateCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute, addtoCart);
router.patch("/", protectRoute, removeAllItem);
router.patch("/:id", protectRoute, updateCart);
export default router;
