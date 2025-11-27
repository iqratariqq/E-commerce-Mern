import express from "express";
import { login, logout, refreshToken, registerKitchen, signup } from "../controller/auth.controller.js";
import { isVendor } from "../middelware/auth.middelware.js";
import upload from "../middelware/multer.middelware.js";

const router = express.Router();

router.post("/signup/:role", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/vendor/register-kitchen",isVendor,upload.single('kitchenImage'),registerKitchen);

// refresh access token
router.post("/refresh-token", refreshToken);

export default router;
