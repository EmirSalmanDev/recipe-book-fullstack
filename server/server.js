import "express-async-errors"; // automatically forwards errors from async routes to Express error handlers
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// routers
import recipeRouter from "./routes/recipeRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Serve static files (e.g., React build, images, CSS, favicon) from the "public" folder
// Thanks to this, every file inside the "public" folder becomes automatically accessible via the web
app.use(express.static(path.resolve(__dirname, "./public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

// get all recipes
app.use("/api/recipes", authenticateUser, recipeRouter);
app.use("/api/users", authenticateUser, userRouter);
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
