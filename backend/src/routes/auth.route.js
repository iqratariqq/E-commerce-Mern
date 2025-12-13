import express from "express";
import {
  login,
  logout,
  refreshToken,
  signup,
} from "../controller/auth.controller.js";

import { addAdmin } from "../controller/admin.controller.js";
import { protectRoute } from "../middelware/auth.middelware.js";

const router = express.Router();

router.post("/signup/:role", signup);
router.post("/login", login);
router.post("/add", addAdmin);
router.post("/logout", logout);


router.get("/profile", protectRoute, async (req, res) => {
  try {

    return res.status(200).json({success:true,user:req.user});
  } catch (error) {
    return res
      .status(500)
      .json({
        sucess: false,
        message: "Internal server error",
        error: error.message
      });
  }
});

// refresh access token
router.post("/refresh-token", refreshToken);

export default router;
