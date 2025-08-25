import Recipe from "../models/recipeModel.js";
import { StatusCodes } from "http-status-codes";

export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.rid);

  res.status(StatusCodes.OK).json({ recipe });
};

export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user.userId }); // attached by jwt

  res.status(StatusCodes.OK).json({ recipes });
};

export const createRecipe = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { title, description, createdBy, recipeStatus } = req.body;
  const recipe = await Recipe.create({
    title,
    description,
    createdBy,
    recipeStatus,
  }); // express-async-errors catches the error

  res.status(StatusCodes.CREATED).json({ recipe });
};

export const editRecipeById = async (req, res) => {
  const { title, description } = req.body;

  const editedRecipe = await Recipe.findByIdAndUpdate(
    req.params.rid,
    { title, description },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ msg: "recipe updated" });
};

export const deleteRecipeById = async (req, res) => {
  const removedRecipe = await Recipe.findByIdAndDelete(req.params.rid);

  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe deleted", recipe: removedRecipe });
};
