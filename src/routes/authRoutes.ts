import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/auth", authController.login);

export default router;
