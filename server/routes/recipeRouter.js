import { Router } from "express";
const router = Router();

import {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  editRecipeById,
  deleteRecipeById,
} from "../controllers/recipeController.js";
import { validateRecipeInput } from "../models/validationMiddleware.js";

router.get("/:rid", getRecipeById);

router.get("/", getAllRecipes);

router.post("/", validateRecipeInput, createRecipe);

router.patch("/:rid", validateRecipeInput, editRecipeById);

router.delete("/:rid", deleteRecipeById);

export default router;
