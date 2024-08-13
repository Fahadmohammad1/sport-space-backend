import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});

// login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.loginUser(userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.isUserExist,
  });
});

export const UserController = {
  createUser,
  loginUser,
};
