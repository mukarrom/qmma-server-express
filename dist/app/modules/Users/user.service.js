"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
// get all users service
const getAllUsersService = async () => {
    const result = await user_model_1.UserModel.find();
    return result;
};
// find user by id service
const getUserByIdService = async (id) => {
    const result = await user_model_1.UserModel.findById(id);
    return result;
};
// Service to create new user
const createNewUserService = async (payload) => {
    // get user id
    const userId = await (0, user_utils_1.createUserId)();
    // set user id into user data
    payload.userId = userId;
    // create new user
    const result = await user_model_1.UserModel.create(payload);
    return result;
};
// Service to update user
const updateUserService = async (id, payload) => {
    const result = await user_model_1.UserModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
// Service to delete user
const deleteUserService = async (id) => {
    const result = await user_model_1.UserModel.findByIdAndDelete(id);
    return result;
};
exports.UserServices = {
    getAllUsersService,
    createNewUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
};
