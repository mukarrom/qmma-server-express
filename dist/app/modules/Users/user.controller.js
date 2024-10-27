"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
// Controller to get all users
const getAllUsersController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.getAllUsersService();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    });
});
// Controller to get user by id
const getUserByIdController = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const result = await user_service_1.UserServices.getUserByIdService(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User fetched successfully",
        data: result,
    });
});
// Controller to create new user
const createNewUserController = (0, catchAsync_1.default)(async (req, res) => {
    const userData = req.body;
    const result = await user_service_1.UserServices.createNewUserService(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
});
// Controller to update user
const updateUserController = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    const result = await user_service_1.UserServices.updateUserService(userId, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});
// Controller to delete user
const deleteUserController = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    await user_service_1.UserServices.deleteUserService(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User deleted successfully",
        data: null,
    });
});
exports.UserControllers = {
    getAllUsersController,
    getUserByIdController,
    createNewUserController,
    updateUserController,
    deleteUserController,
};
