import { UnauthenticatedError } from "../models/customError.js";
import { verifyJTW } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJTW(token);
    req.user = { userId, role }; // attach the user to our request

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
