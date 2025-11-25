import express from "express"
import { isCustomer, protectRoute } from "../middelware/auth.middelware";

import { addReview, deleteReview, getReviews } from "../controller/review.controller";

const router=express.Router();

router.get("/",protectRoute,getReviews)
router.post("/:id",protectRoute,isCustomer,addReview)
router.delete("/:id",protectRoute,isCustomer,deleteReview)


export default router