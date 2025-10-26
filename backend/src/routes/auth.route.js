import express from "express";
import { login, logout, refreshToken, signup } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// refresh access token
router.post("/refresh-token", refreshToken);

export default router;
