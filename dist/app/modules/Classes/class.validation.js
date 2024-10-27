"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidations = void 0;
const zod_1 = require("zod");
// class validation schema
const ClassValidationSchema = zod_1.z.object({
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
});
const createClassValidationSchema = zod_1.z.object({
    body: ClassValidationSchema,
});
const updateClassValidationSchema = zod_1.z.object({
    body: ClassValidationSchema.partial(),
});
exports.ClassValidations = {
    createClassValidationSchema,
    updateClassValidationSchema,
};
