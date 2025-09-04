import { Router } from "express";
const router = Router();

import {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  editRecipeById,
  deleteRecipeById,
  showStats,
} from "../controllers/recipeController.js";
import {
  validateRecipeInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/", getAllRecipes);

// router.post("/", checkForTestUser, validateRecipeInput, createRecipe);
router.post("/", validateRecipeInput, createRecipe);

router.get("/stats", showStats);

router.get("/:rid", validateIdParam, getRecipeById);

router.patch(
  "/:rid",
  checkForTestUser,
  validateRecipeInput,
  validateIdParam,
  editRecipeById
);

router.delete("/:rid", checkForTestUser, validateIdParam, deleteRecipeById);

export default router;
