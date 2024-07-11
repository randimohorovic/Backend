import express from "express";

const router = express.Router();

// definiram si sve rute koje koristim za backend
router.get("/", (req, res) => {
  res.json({
    test: "test123",
  });
});
export default router;
