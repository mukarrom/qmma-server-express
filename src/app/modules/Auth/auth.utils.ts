import argon2 from "argon2";
import exp from "constants";
import jwt from "jsonwebtoken";

export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    if (await argon2.verify(hashedPassword, password)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createAccessToken = (payload: { userId: string; role: string }, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const createRefreshToken = (payload: { userId: string; role: string }, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyAccessToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const verifyRefreshToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
