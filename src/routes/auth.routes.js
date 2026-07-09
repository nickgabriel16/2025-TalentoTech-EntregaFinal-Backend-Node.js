// Importaciones
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

// POST /auth/login - Autentica al usuario y devuelve un token
router.post("/login", authController.login);

export default router;
