import express from "express";
import { createRating, getPostRatings } from "../Handlers/rating.controller.js";
import { verifyToken } from "../Handlers/checkUserAuth";

const router = express.Router();

router.post("/create", verifyToken, createRating);
router.get("/getPostRatings/:postId", getPostRatings);

export default router;
