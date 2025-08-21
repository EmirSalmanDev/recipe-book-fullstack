import Recipe from "../models/recipeModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../models/customError.js";

export const getRecipeById = async (req, res) => {
  const { rid } = req.params;

  const recipe = await Recipe.findById(rid);
  if (!recipe)
    throw new NotFoundError("Could not find a recipe for the given place id.");
  res.status(StatusCodes.OK).json({ recipe });
};

export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({});

  res.status(StatusCodes.OK).json({ recipes });
};

export const createRecipe = async (req, res) => {
  const { title, description } = req.body;
  const recipe = await Recipe.create({ title, description }); // express-async-errors catches the error

  res.status(StatusCodes.CREATED).json({ recipe });
};

export const editRecipeById = async (req, res) => {
  const { rid } = req.params;
  const { title, description } = req.body;

  const editedRecipe = await Recipe.findByIdAndUpdate(
    rid,
    { title, description },
    { new: true, runValidators: true }
  );
  if (!editedRecipe)
    throw new NotFoundError("Could not find a recipe for the given place id.");

  res.status(StatusCodes.OK).json({ msg: "recipe updated" });
};

export const deleteRecipeById = async (req, res) => {
  const { rid } = req.params;

  const removedRecipe = await Recipe.findByIdAndDelete(rid);
  if (!removedRecipe)
    throw new NotFoundError("Could not find a recipe for the given place id.");

  res
    .status(StatusCodes.OK)
    .json({ msg: "recipe deleted", recipe: removedRecipe });
};
