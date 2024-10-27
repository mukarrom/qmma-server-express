import { model, Schema } from "mongoose";
import { TName, IUser, TAddress } from "./user.interface";
import { BLOOD_GROUP, USER_ROLE, USER_STATUS } from "./user.constant";

const nameSchema = new Schema<TName>(
  {
    nameBn: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      default: "",
    },
    nameAr: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    village: {
      type: String,
    },
    postOffice: {
      type: String,
    },
    policeStation: {
      type: String,
    },
    district: {
      type: String,
    },
    postCode: {
      type: String,
    },
  },
  { _id: false },
);

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: nameSchema,
    photoUrl: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
    birthCertificateNo: {
      type: String,
    },
    nidNo: {
      type: String,
    },
    mobile: {
      type: [String],
    },
    bloodGroup: {
      type: String,
      enum: Object.values(BLOOD_GROUP),
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    presentAddress: addressSchema,
    permanentAddress: addressSchema,
    roles: {
      type: String,
      enum: Object.values(USER_ROLE),
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: "active",
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

export const UserModel = model("User", userSchema);
