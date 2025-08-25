import { Router } from "express";
import {
  getAppStatus,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getAppStatus);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
