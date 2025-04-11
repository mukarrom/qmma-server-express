import { USER_ROLE, USER_STATUS } from "../Users/user.constant";

export interface IAuth {
  userId: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  status: (typeof USER_STATUS)[keyof typeof USER_STATUS];
  isDeleted: boolean;
}
