import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/authValidation.middleware.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/register", signupValidation, register);

export default router;
