import express from "express"
import { isCustomer, protectRoute } from "../middelware/auth.middelware.js";

import { addReview, deleteReview, getReviews } from "../controller/review.controller.js";

const router=express.Router();

router.get("/:id",protectRoute,getReviews)
router.post("/:id",protectRoute,isCustomer,addReview)
router.delete("/:id",protectRoute,isCustomer,deleteReview)


export default router