import { Router } from "express";
const router = Router();

import {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  editRecipeById,
  deleteRecipeById,
} from "../controllers/recipeController.js";

router.get("/:rid", getRecipeById);

router.get("/user/:uid", getAllRecipes);

router.post("/", createRecipe);

router.patch("/:rid", editRecipeById);

router.delete("/:rid", deleteRecipeById);

export default router;
