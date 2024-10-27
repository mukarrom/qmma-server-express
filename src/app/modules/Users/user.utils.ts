import { UserModel } from "./user.model";

export const createUserId = async () => {
  const count = (await UserModel.countDocuments()) + 1;
  const sixDigit = count.toString().padStart(6, "0");
  return "U" + sixDigit;
};

export const createSecondUserId = async () => {
  const count = (await UserModel.countDocuments()) + 1;
  const sixDigit = count.toString().padStart(6, "0");
  return "U" + sixDigit;
};
