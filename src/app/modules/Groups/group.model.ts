import { Schema, model } from "mongoose";
import { IGroup } from "./group.interface";
import { STATUS } from "../../constants/status.constants";

// Create the schema
const groupSchema = new Schema<IGroup>(
  {
    className: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    serial: { type: Number, required: true, unique: true }, // auto increment by 1
    nameBn: { type: String, required: true },
    nameAr: { type: String },
    nameEn: { type: String },
    status: { type: String, enum: Object.values(STATUS), default: "active" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Create the model
export const GroupModel = model<IGroup>("Group", groupSchema);
