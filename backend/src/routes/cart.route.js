import express from "express";

import { isCustomer, protectRoute } from "../middelware/auth.middelware.js";
import {
  addtoCart,
  getCartItems,
  removeAllItem,
  updateCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute,isCustomer, addtoCart);
router.patch("/", protectRoute,isCustomer, removeAllItem);
router.patch("/:id", protectRoute,isCustomer, updateCart);
export default router;
