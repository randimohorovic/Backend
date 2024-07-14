import express from "express";
import { signup } from "../Handlers/auth.handler.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
