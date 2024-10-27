import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createUserId } from "./user.utils";

// get all users service
const getAllUsersService = async () => {
  const result = await UserModel.find();
  return result;
};

// find user by id service
const getUserByIdService = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

// Service to create new user
const createNewUserService = async (payload: IUser) => {
  // get user id
  const userId: string = await createUserId();
  // set user id into user data
  payload.userId = userId;

  // create new user
  const result = await UserModel.create(payload);
  return result;
};

// Service to update user
const updateUserService = async (id: string, payload: Partial<IUser>) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Service to delete user
const deleteUserService = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
