import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("User", userSchema);
