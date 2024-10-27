"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupValidations = void 0;
const zod_1 = require("zod");
// Define schema for group
const GroupValidationSchema = zod_1.z.object({
    className: zod_1.z.string({
        required_error: "Class name is required",
        invalid_type_error: "Class name must be a string",
    }),
    nameBn: zod_1.z.string({
        required_error: "Bengali name is required",
        invalid_type_error: "Bengali name must be a string",
    }),
    nameAr: zod_1.z
        .string({
        invalid_type_error: "Arabic name must be a string",
    })
        .optional(),
    nameEn: zod_1.z
        .string({
        invalid_type_error: "English name must be a string",
    })
        .optional(),
});
const createGroupValidationSchema = zod_1.z.object({
    body: GroupValidationSchema,
});
const updateGroupValidationSchema = zod_1.z.object({
    body: GroupValidationSchema.partial(),
});
// Export the validation schema
exports.GroupValidations = {
    createGroupValidationSchema,
    updateGroupValidationSchema,
};
