import express from "express";
import { verifyToken } from "../Handlers/checkUserAuth";
import { create } from "../Handlers/post.handler";

const router = express.Router();

router.post("/create", verifyToken, create);

export default router;
