import { model, Schema } from "mongoose";
import { IAcademicYear } from "./academicYear.interface";
import { ACADEMIC_YEAR_STATUS } from "./academicYear.constant";

const academicYearSchema = new Schema<IAcademicYear>(
  {
    serial: { type: Number, required: true, unique: true }, // auto increment by 1
    nameBn: { type: String, required: true, unique: true },
    nameAr: { type: String, unique: true },
    nameEn: { type: String, unique: true },
    startDate: { type: Date, required: true, unique: true },
    endDate: { type: Date, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(ACADEMIC_YEAR_STATUS),
      default: ACADEMIC_YEAR_STATUS.UPCOMING,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const AcademicYearModel = model<IAcademicYear>("Academic_year", academicYearSchema);
