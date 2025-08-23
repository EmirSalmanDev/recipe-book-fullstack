import "express-async-errors"; // automatically forwards errors from async routes to Express error handlers
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import mongoose, { mongo } from "mongoose";

// middleware
import errorHandlerMiddleware from "./models/errorHandlerMiddleware.js";

// routers
import recipeRouter from "./routes/recipeRouter.js";
import authRouter from "./routes/authRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// get all recipes
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
