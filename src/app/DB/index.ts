import config from "../config";
import { AuthModel } from "../modules/Auth/auth.model";
import { USER_ROLE, USER_STATUS } from "../modules/Users/user.constant";

const superUser = {
  userId: "super-6501",
  email: "me@mukarrom.com",
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.SUPER_ADMIN,
  status: USER_STATUS.ACTIVE,
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await AuthModel.findOne({ role: USER_ROLE.SUPER_ADMIN });
  if (!isSuperAdminExist) {
    await AuthModel.create(superUser);
  }
};

export default seedSuperAdmin;
