"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearValidation = void 0;
const zod_1 = require("zod");
// zod validation schema
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "name is required",
        invalid_type_error: "name must be String",
    }),
    description: zod_1.z
        .string({
        invalid_type_error: "Description must be String",
    })
        .optional(),
    price: zod_1.z
        .number({
        invalid_type_error: "Price must be Number",
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
    category: zod_1.z.string({
        invalid_type_error: "Category must be Object Id",
    }),
    tags: zod_1.z.array(zod_1.z.string({
        invalid_type_error: "Tags must be an array of strings",
    })),
    totalBought: zod_1.z
        .number({
        invalid_type_error: "Total Bought must be a number",
    })
        .optional(),
    totalSold: zod_1.z
        .number({
        invalid_type_error: "Total Sold must be a number",
    })
        .optional(),
    inStock: zod_1.z
        .number({
        invalid_type_error: "In Stock must be a number",
    })
        .optional(),
});
const createProductValidationSchema = zod_1.z.object({
    body: ProductValidationSchema,
});
const updateProductValidationSchema = zod_1.z.object({
    body: ProductValidationSchema.partial(),
});
exports.AcademicYearValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
