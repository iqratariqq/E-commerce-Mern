import express from "express";
import { login, logout, refreshToken,signup } from "../controller/auth.controller.js";

import { addAdmin } from "../controller/admin.controller.js";

const router = express.Router();

router.post("/signup/:role", signup);
router.post("/login", login);
router.post("/add", addAdmin);
router.post("/logout", logout);


// refresh access token
router.post("/refresh-token", refreshToken);

export default router;
