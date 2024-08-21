import express from "express";
import { verifyToken } from "../Handlers/checkUserAuth";
import { updateUser } from "../Handlers/user.handler";

const router = express.Router();

// definiram si sve rute koje koristim za backend
router.get("/", (req, res) => {
  res.json({
    test: "test123",
  });
});

router.post("/update/:id", verifyToken, updateUser);

export default router;
