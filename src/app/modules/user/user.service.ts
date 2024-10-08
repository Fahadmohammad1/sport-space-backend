import httpStatus from "http-status";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelper";
import config from "../../config";

// register
const createUser = async (user: IUser) => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user account");
  }

  return createdUser;
};

// login
const loginUser = async (user: Partial<IUser>) => {
  const { email, password } = user;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (isUserExist.password && !(isUserExist.password === password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  const accessToken = jwtHelpers.createToken(
    { email, role: isUserExist.role, id: isUserExist.id },
    config.jwt as Secret,
    config.jwt_expires_in as string
  );

  return { accessToken, isUserExist };
};

export const UserService = {
  createUser,
  loginUser,
};
