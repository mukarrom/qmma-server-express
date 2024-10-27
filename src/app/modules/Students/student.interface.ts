// TypeScript interfaces generated from DBML definitions

import { Types } from "mongoose";
import { STUDENT_STATUS } from "./student.constant";

export type TPreviousEducationInfo = {
  previousSchoolName?: string;
  previousClassName?: string;
  previousSectionName?: string;
  previousGroupName?: string;
  result?: string;
};

export interface IStudent {
  studentId: string;
  userDetails: Types.ObjectId;
  guardian: Types.ObjectId;
  admissionNo?: number;
  admissionTime?: Date;
  academicYear: Types.ObjectId;
  class: Types.ObjectId;
  group?: Types.ObjectId;
  // section?: string;
  roleNo?: number;
  previousEducationInfo?: TPreviousEducationInfo;
  status: (typeof STUDENT_STATUS)[keyof typeof STUDENT_STATUS];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export type TUserRoles =
//   | "superAdmin"
//   | "admin"
//   | "principal"
//   | "nazem"
//   | "darulIqamah"
//   | "teacher"
//   | "student"
//   | "gateMan"
//   | "cocker"
//   | "guardian";
