import { Document } from "mongoose";
import { ACADEMIC_YEAR_STATUS } from "./academicYear.constant";

export interface IAcademicYear extends Document {
  serial: number;
  nameBn: string;
  nameAr: string;
  nameEn: string;
  startDate: Date;
  endDate: Date;
  status: (typeof ACADEMIC_YEAR_STATUS)[keyof typeof ACADEMIC_YEAR_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
