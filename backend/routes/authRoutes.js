import express from "express";
import { registerStudent, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", login);

export default router;