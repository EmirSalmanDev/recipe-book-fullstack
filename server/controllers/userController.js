import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  const user = await User.findById(userId, "-password");
  console.log(user);

  res.status(StatusCodes.OK).json({ user });
};

export const getAppStatus = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get app status" });
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { name, email, lastname } = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, {
    name,
    email,
    lastname,
  });

  res.status(StatusCodes.OK).json({ msg: "User updated" });
};
