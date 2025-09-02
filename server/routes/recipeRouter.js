import { Router } from "express";
const router = Router();

import {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  editRecipeById,
  deleteRecipeById,
} from "../controllers/recipeController.js";
import {
  validateRecipeInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/:rid", validateIdParam, getRecipeById);

router.get("/", getAllRecipes);

router.post("/", checkForTestUser, validateRecipeInput, createRecipe);

router.patch(
  "/:rid",
  checkForTestUser,
  validateRecipeInput,
  validateIdParam,
  editRecipeById
);

router.delete("/:rid", checkForTestUser, validateIdParam, deleteRecipeById);

export default router;
