"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidations = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const user_validation_1 = require("../Users/user.validation");
const guardian_validation_1 = require("../Guardians/guardian.validation");
// Define zod validation schema for previous education info
const previousEducationInfoValidationSchema = zod_1.z.object({
    previousSchoolName: zod_1.z
        .string({
        invalid_type_error: "Previous school name must be a string",
    })
        .optional(),
    previousClassName: zod_1.z
        .string({
        invalid_type_error: "Previous class name must be a string",
    })
        .optional(),
    previousGroupName: zod_1.z
        .string({
        invalid_type_error: "Previous group name must be a string",
    })
        .optional(),
    previousSectionName: zod_1.z
        .number({
        invalid_type_error: "Previous section name must be a number",
    })
        .optional(),
    result: zod_1.z
        .string({
        invalid_type_error: "Result must be a string",
    })
        .optional(),
});
// Define zod validation schema from Student interface
const StudentValidationSchema = zod_1.z.object({
    // admission time
    admissionTime: zod_1.z
        .string({
        required_error: "Admission time is required",
        invalid_type_error: "Admission time must be a string",
    })
        .optional(),
    // academic year
    academicYear: zod_1.z
        .string({
        required_error: "Academic Year ID is required",
        invalid_type_error: "Academic Year ID must be a mongoose ObjectId",
    })
        .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), { message: "Invalid Academic Year ID" }),
    // class
    class: zod_1.z
        .string({
        required_error: "Class ID is required",
        invalid_type_error: "Class ID must be a mongoose ObjectId",
    })
        .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), { message: "Invalid Class ID" }),
    // group
    group: zod_1.z
        .string({
        invalid_type_error: "Group ID must be a mongoose ObjectId",
    })
        .refine((value) => !value || mongoose_1.default.Types.ObjectId.isValid(value), { message: "Invalid Group ID" })
        .optional(),
    // previous education info
    previousEducationInfo: previousEducationInfoValidationSchema,
});
const createUserGuardianStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userStudent: user_validation_1.UserValidations.userValidationSchema,
        student: StudentValidationSchema,
        userGuardian: user_validation_1.UserValidations.userValidationSchema,
        guardian: guardian_validation_1.GuardianValidations.guardianValidationSchema,
    }),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: StudentValidationSchema.partial(),
});
exports.StudentValidations = {
    createUserGuardianStudentValidationSchema,
    updateStudentValidationSchema,
};
