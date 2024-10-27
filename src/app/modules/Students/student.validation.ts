import mongoose from "mongoose";
import { z } from "zod";
import { UserValidations } from "../Users/user.validation";
import { GuardianValidations } from "../Guardians/guardian.validation";

// Define zod validation schema for previous education info
const previousEducationInfoValidationSchema = z.object({
  previousSchoolName: z
    .string({
      invalid_type_error: "Previous school name must be a string",
    })
    .optional(),
  previousClassName: z
    .string({
      invalid_type_error: "Previous class name must be a string",
    })
    .optional(),
  previousGroupName: z
    .string({
      invalid_type_error: "Previous group name must be a string",
    })
    .optional(),
  previousSectionName: z
    .number({
      invalid_type_error: "Previous section name must be a number",
    })
    .optional(),
  result: z
    .string({
      invalid_type_error: "Result must be a string",
    })
    .optional(),
});

// Define zod validation schema from Student interface
const StudentValidationSchema = z.object({
  // admission time
  admissionTime: z
    .string({
      required_error: "Admission time is required",
      invalid_type_error: "Admission time must be a string",
    })
    .optional(),
  // academic year
  academicYear: z
    .string({
      required_error: "Academic Year ID is required",
      invalid_type_error: "Academic Year ID must be a mongoose ObjectId",
    })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), { message: "Invalid Academic Year ID" }),
  // class
  class: z
    .string({
      required_error: "Class ID is required",
      invalid_type_error: "Class ID must be a mongoose ObjectId",
    })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), { message: "Invalid Class ID" }),
  // group
  group: z
    .string({
      invalid_type_error: "Group ID must be a mongoose ObjectId",
    })
    .refine((value) => !value || mongoose.Types.ObjectId.isValid(value), { message: "Invalid Group ID" })
    .optional(),
  // previous education info
  previousEducationInfo: previousEducationInfoValidationSchema,
});

const createUserGuardianStudentValidationSchema = z.object({
  body: z.object({
    userStudent: UserValidations.userValidationSchema,
    student: StudentValidationSchema,
    userGuardian: UserValidations.userValidationSchema,
    guardian: GuardianValidations.guardianValidationSchema,
  }),
});

const updateStudentValidationSchema = z.object({
  body: StudentValidationSchema.partial(),
});

export const StudentValidations = {
  createUserGuardianStudentValidationSchema,
  updateStudentValidationSchema,
};
