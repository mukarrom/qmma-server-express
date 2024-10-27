import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// Controller to get all users
const getAllUsersController = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

// Controller to get user by id
const getUserByIdController = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getUserByIdService(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

// Controller to create new user
const createNewUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createNewUserService(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// Controller to update user
const updateUserController = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  const result = await UserServices.updateUserService(userId, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

// Controller to delete user
const deleteUserController = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await UserServices.deleteUserService(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: null,
  });
});

export const UserControllers = {
  getAllUsersController,
  getUserByIdController,
  createNewUserController,
  updateUserController,
  deleteUserController,
};
