import mongoose from "mongoose";
import Recipe from "../models/recipeModel.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";

export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.rid);

  res.status(StatusCodes.OK).json({ recipe });
};

export const getAllRecipes = async (req, res) => {
  const { search, recipeStatus, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId, // attached by jwt
  };
  if (search) {
    queryObject.$or = [{ title: { $regex: search, $options: "i" } }]; // mongoDB query operator
  }
  if (recipeStatus && recipeStatus !== "all") {
    queryObject.recipeStatus = recipeStatus;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "title",
    "z-a": "-title",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const recipes = await Recipe.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalRecipes = await Recipe.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRecipes / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalRecipes, numOfPages, currentPage: page, recipes });
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
  const { title, description, recipeStatus } = req.body;

  const editedRecipe = await Recipe.findByIdAndUpdate(
    req.params.rid,
    { title, description, recipeStatus },
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

export const showStats = async (req, res) => {
  let stats = await Recipe.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$recipeStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    testing: stats.testing || 0,
    done: stats.done || 0,
  };
  // { testing: 3, done: 2 }

  let monthlyNewRecipes = await Recipe.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 4 },
  ]);

  monthlyNewRecipes = monthlyNewRecipes
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY"); // dayjs months starts from 0 but mongo starts from 1

      return { date, count };
    })
    .reverse();
  // [ { date: 'Aug 25', count: 2 }, { date: 'Sep 25', count: 3 } ]

  res.status(StatusCodes.OK).json({ defaultStats, monthlyNewRecipes });
};
