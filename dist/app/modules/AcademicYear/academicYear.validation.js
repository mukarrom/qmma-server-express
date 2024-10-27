"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearValidation = void 0;
const zod_1 = require("zod");
// zod validation schema
const AcademicYearValidationSchema = zod_1.z.object({
    nameBn: zod_1.z.string({
        required_error: "Bengali name is required",
        invalid_type_error: "Bengali name must be String and Bangla script",
    }),
    nameEn: zod_1.z
        .string({
        invalid_type_error: "English name must be String",
    })
        .optional(),
    nameAr: zod_1.z
        .string({
        invalid_type_error: "Arabic name must be String",
    })
        .optional(),
    startDate: zod_1.z
        .string({
        invalid_type_error: "Start Date must be string",
    })
        .optional(),
    endDate: zod_1.z
        .string({
        invalid_type_error: "End Date must be string",
    })
        .optional(),
});
const createAcademicYearValidationSchema = zod_1.z.object({
    body: AcademicYearValidationSchema,
});
const updateAcademicYearValidationSchema = zod_1.z.object({
    body: AcademicYearValidationSchema.partial(),
});
exports.AcademicYearValidation = {
    createAcademicYearValidationSchema,
    updateAcademicYearValidationSchema,
};
