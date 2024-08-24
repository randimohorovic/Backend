import express from "express";
import { verifyToken } from "../Handlers/checkUserAuth";
import { create, getposts } from "../Handlers/post.handler";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
export default router;
