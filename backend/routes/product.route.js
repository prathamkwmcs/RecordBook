import express from "express";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", ensureAuth, (req, res) => {
  console.log("--- logged in user details ---", req.user);
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "laptop",
      price: 50000,
    },
  ]);
});

export default router;
