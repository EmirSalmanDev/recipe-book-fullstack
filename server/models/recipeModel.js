import mongoose from "mongoose";
import { RECIPE_STATUS } from "../utils/constants.js";

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    recipeStatus: {
      type: String,
      enum: Object.values(RECIPE_STATUS),
      default: RECIPE_STATUS.TESTING,
    },
    // image: { type: String, required: true },
    //creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", recipeSchema);
