import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../models/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isValiduser = user && (await comparePassword(password, user.password));
  if (!isValiduser) throw new UnauthenticatedError("invalid cretenditals");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in production
  });
  res.status(StatusCodes.OK).json({ msg: "user login" });
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

export const logout = (req, res) => {
  res.cookie("token", "logout"),
    {
      httpOnly: true,
      expires: new Date(Date.now()),
    };
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
