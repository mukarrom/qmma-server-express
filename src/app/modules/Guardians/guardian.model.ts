import { model, Schema } from "mongoose";
import { IGuardian } from "./guardian.interface";
import { GUARDIAN_STATUS, RELATIONS } from "./guardian.constant";

// guardian model
const guardianSchema = new Schema<IGuardian>(
  {
    guardianId: {
      type: String,
      required: true,
      unique: true,
    },
    userDetails: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    occupation: { type: String },
    relation: {
      type: String,
      enum: Object.values(RELATIONS),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(GUARDIAN_STATUS),
      default: "active",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const GuardianModel = model<IGuardian>("Guardian", guardianSchema);
