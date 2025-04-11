import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IAuth } from "./auth.interface";
import { AuthModel } from "./auth.model";
import { createAccessToken, createRefreshToken, verifyPassword, verifyRefreshToken } from "./auth.utils";
import { USER_STATUS } from "../Users/user.constant";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import argon2 from "argon2";

const loginService = async (payload: IAuth) => {
  // check if user exists
  const isUserExist = await AuthModel.findOne({ userId: payload.userId });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  // check if password is correct
  if (!(await verifyPassword(payload.password, isUserExist.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
  }

  // check if user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // check if user is active
  if (isUserExist.status !== USER_STATUS.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is inactive");
  }

  // // check if password is expired
  // if (isUserExist.needsPasswordChange) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Password is expired");
  // }

  // create access token and refresh token
  const jwtPayload = { userId: isUserExist.userId, role: isUserExist.role };
  const accessToken = createAccessToken(jwtPayload, config.jwtAccessSecret, config.jwtAccessExpiresIn);
  const refreshToken = createRefreshToken(jwtPayload, config.jwtRefreshSecret, config.jwtRefreshExpiresIn);

  return { accessToken, refreshToken, needPasswordChange: isUserExist.needsPasswordChange };
};

const updatePasswordService = async (userdata: JwtPayload, payload: { oldPassword: string; newPassword: string }) => {
  // check if user exists
  const isUserExist = await AuthModel.findOne({ userId: userdata.userId });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  // check if password is correct
  if (!(await verifyPassword(payload.oldPassword, isUserExist.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
  }

  // check if user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // check if user is active
  if (isUserExist.status !== USER_STATUS.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is inactive");
  }

  // hash password
  const hashedPassword = await argon2.hash(payload.newPassword);

  // update password
  await AuthModel.updateOne(
    { userId: userdata.userId, role: userdata.role },
    { password: hashedPassword, needsPasswordChange: false, passwordChangedAt: new Date() },
  );

  return { message: "Password updated successfully" };
};

const refreshTokenService = async (token: string) => {
  // verify token
  const decoded = verifyRefreshToken(token, config.jwtRefreshSecret);

  const { userId, iat } = decoded as JwtPayload;

  // check if user exists
  const isUserExist = await AuthModel.findOne({ userId });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  // check if user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // check if user is active
  if (isUserExist.status !== USER_STATUS.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is inactive");
  }

  // check if token is expired
  if ((iat as number) < Date.now() / 1000) {
    throw new AppError(httpStatus.BAD_REQUEST, "Token is expired");
  }

  // check if password changed after token issued
  if (isUserExist.passwordChangedAt && isUserExist.passwordChangedAt > new Date((iat as number) * 1000)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password changed after token issued");
  }

  const jwtPayload = { userId: isUserExist.userId, role: isUserExist.role };
  const accessToken = createAccessToken(jwtPayload, config.jwtAccessSecret, config.jwtAccessExpiresIn);
  return { accessToken };
};

export const AuthServices = {
  loginService,
  updatePasswordService,
  refreshTokenService,
};
