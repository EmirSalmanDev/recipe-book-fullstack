import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../models/customError.js";
import { verifyJTW } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJTW(token);
    const testUser = userId === "68b6d6311b4395d480585226";
    req.user = { userId, role, testUser }; // attach the user to our request

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo user. Read Only!");
  }
  next();
};
