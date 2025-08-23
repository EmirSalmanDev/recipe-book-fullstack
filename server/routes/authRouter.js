import { Router } from "express";
const router = Router();

import { login, register } from "../controllers/authController.js";
import { validateRegisterInput } from "../models/validationMiddleware.js";

router.post("/login", login);

router.post("/register", validateRegisterInput, register);

export default router;
