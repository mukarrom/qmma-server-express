import { Types } from "mongoose";
import { GUARDIAN_STATUS, RELATIONS } from "./guardian.constant";

export interface IGuardian {
  guardianId: string;
  relation: (typeof RELATIONS)[keyof typeof RELATIONS];
  userDetails: Types.ObjectId;
  occupation?: string;
  status: (typeof GUARDIAN_STATUS)[keyof typeof GUARDIAN_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
