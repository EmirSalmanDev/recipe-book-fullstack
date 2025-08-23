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
} from "../models/validationMiddleware.js";

router.get("/:rid", validateIdParam, getRecipeById);

router.get("/", getAllRecipes);

router.post("/", validateRecipeInput, createRecipe);

router.patch("/:rid", validateRecipeInput, validateIdParam, editRecipeById);

router.delete("/:rid", validateIdParam, deleteRecipeById);

export default router;
