import { Document, Types } from "mongoose";
import { STATUS } from "../../constants/status.constants";

export interface IGroup extends Document {
  className: Types.ObjectId;
  serial: number;
  nameBn: string;
  nameAr: string;
  nameEn: string;
  status: (typeof STATUS)[keyof typeof STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
