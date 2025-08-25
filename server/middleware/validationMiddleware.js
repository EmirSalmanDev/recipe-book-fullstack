import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../models/customError.js";
import { RECIPE_STATUS } from "../utils/constants.js";
import mongoose from "mongoose";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((e) => e.msg);
        if (errorMessages[0].startsWith("Could not find")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRecipeInput = withValidationErrors([
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 20, max: 300 })
    .withMessage("Description must be between 20 and 300 characters"),
  body("recipeStatus")
    .isIn(Object.values(RECIPE_STATUS))
    .withMessage("Invalid status value"),
]);

export const validateIdParam = withValidationErrors([
  param("rid").custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) {
      throw new BadRequestError("invalid MongoDB id");
    }

    const recipe = await Recipe.findById(value);
    if (!recipe)
      throw new NotFoundError(
        "Could not find a recipe for the given place id."
      );
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exists.");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
