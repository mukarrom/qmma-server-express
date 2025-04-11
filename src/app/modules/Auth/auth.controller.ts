import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const authLoginController = catchAsync(async (req, res) => {
  const result = await AuthServices.loginService(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const changePasswordController = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.updatePasswordService(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
