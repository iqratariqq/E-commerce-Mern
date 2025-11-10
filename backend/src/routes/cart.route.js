import express from "express"
import router from "./product.route";
import { protectRoute } from "../middelware/auth.middelware";

const Route=express.Router();

router.get("/:id",protectRoute)