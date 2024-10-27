import mongoose from "mongoose";
import { IClass } from "./class.interface";
import { STATUS } from "../../constants/status.constants";

const classSchema = new mongoose.Schema<IClass>(
  {
    serial: {
      type: Number,
      required: true,
      unique: true,
    },
    nameBn: {
      type: String,
      required: true,
      unique: true,
    },
    nameAr: {
      type: String,
    },
    nameEn: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
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

export const ClassModel = mongoose.model("Class", classSchema);
