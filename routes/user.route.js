import express from "express";
import { verifyToken } from "../Handlers/checkUserAuth";
import { updateUser, logout } from "../Handlers/user.handler";

const router = express.Router();

// kreiras, rutu, importas funkciju koju vrši iz user.handlers.js
router.post("/update/:id", verifyToken, updateUser);
router.post("/logout", logout);
export default router;
