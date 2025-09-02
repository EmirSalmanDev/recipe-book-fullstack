import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  const user = await User.findById(userId, "-password");

  res.status(StatusCodes.OK).json({ user });
};

export const getAppStatus = async (req, res) => {
  const users = await User.countDocuments();
  const recipes = await Recipe.countDocuments();
  res.status(StatusCodes.OK).json({ users, recipes });
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    // Upload the file from local storage to Cloudinary
    await fs.unlink(req.file.path);
    // Delete the local file after successful upload to free up server storage

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const oldUser = await User.findByIdAndUpdate(userId, newUser);

  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "User updated" });
};
