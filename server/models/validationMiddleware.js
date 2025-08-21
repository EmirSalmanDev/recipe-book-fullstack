import { body, validationResult } from "express-validator";
import { BadRequestError } from "./customError.js";
import { RECIPE_STATUS } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((e) => e.msg);
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
