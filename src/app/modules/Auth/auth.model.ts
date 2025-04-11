import { model, Schema } from "mongoose";
import { IAuth } from "./auth.interface";
import { USER_ROLE, USER_STATUS } from "../Users/user.constant";
import argon2 from "argon2";

const authModelSchema = new Schema<IAuth>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.STUDENT,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

authModelSchema.pre("save", async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

export const AuthModel = model<IAuth>("Auth", authModelSchema);
