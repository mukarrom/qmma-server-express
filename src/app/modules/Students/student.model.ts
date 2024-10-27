import { model, Schema } from "mongoose";
import { IStudent, TPreviousEducationInfo } from "./student.interface";
import { STUDENT_STATUS } from "./student.constant";

// previous education info schema
const previousEducationInfoSchema = new Schema<TPreviousEducationInfo>(
  {
    previousSchoolName: {
      type: String,
      required: true,
    },
    previousClassName: {
      type: String,
      required: true,
    },
    previousGroupName: {
      type: String,
      required: true,
    },
    previousSectionName: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// create mongoose schema
const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    userDetails: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guardian: {
      type: Schema.Types.ObjectId,
      ref: "Guardian",
    },
    admissionNo: {
      type: Number,
      required: true,
      unique: true,
    },
    admissionTime: {
      type: Date,
      default: Date.now,
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: "Academic_year",
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    // section: {
    //   type: String,
    //   required: true,
    // },
    roleNo: {
      type: Number,
      required: true,
    },
    previousEducationInfo: previousEducationInfoSchema,
    // transaction: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Transaction",
    // },
    status: {
      type: String,
      enum: Object.values(STUDENT_STATUS),
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

// Create the model
export const StudentModel = model<IStudent>("Student", studentSchema);
