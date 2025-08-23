import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/passwordUtils.js";

export const login = (req, res) => {
  res.send("login");
};

export const register = async (req, res) => {
  const { name, email, password, lastname } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    lastname,
  });
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};
