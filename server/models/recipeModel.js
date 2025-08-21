import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 30 },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 300,
    },
    recipeStatus: {
      type: String,
      enum: ["testing", "done"],
      default: "testing",
    },
    // image: { type: String, required: true },
    //creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", recipeSchema);
