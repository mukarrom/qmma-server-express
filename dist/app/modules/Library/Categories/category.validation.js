"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const zod_1 = require("zod");
// zod validation schema
const categoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "name is required",
        invalid_type_error: "name must be String",
    }),
    description: zod_1.z
        .string({
        invalid_type_error: "Description must be String",
    })
        .optional(),
    image: zod_1.z
        .string({
        invalid_type_error: "Image must be string",
    })
        .url({
        message: "Image must be a valid URL",
    })
        .optional(),
});
const createCategoryValidationSchema = zod_1.z.object({
    body: categoryValidationSchema,
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: categoryValidationSchema.partial(),
});
exports.CategoryValidations = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
