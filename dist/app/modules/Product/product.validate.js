"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsValidationSchema = void 0;
const zod_1 = require("zod");
const variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string({
        invalid_type_error: "Type must be a string (e.g., size, color)",
        required_error: "Type is required",
    }),
    value: zod_1.z.string({
        invalid_type_error: "Value must be a string (e.g., Small, Red)",
        required_error: "Value is required",
    }),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number({
        invalid_type_error: "Quantity must be a number",
        required_error: "Quantity is required",
    })
        .int()
        .nonnegative(),
    // Add inStock validation. InStock must be a boolean. If quantity is 0, inStock must be false. If quantity is greater than 0, inStock must be true.
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
    })
        .min(1),
    description: zod_1.z
        .string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
    })
        .min(1),
    price: zod_1.z
        .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
    })
        .min(1),
    category: zod_1.z.string({
        invalid_type_error: "Category must be a string",
        required_error: "Category is required",
    }),
    tags: zod_1.z.array(zod_1.z
        .string({
        invalid_type_error: "Tag must be a string",
        required_error: "Tag is required",
    })
        .min(1)),
    variants: variantsValidationSchema.array(),
    inventory: inventoryValidationSchema,
});
const createNewProductSchema = zod_1.z.object({
    body: productValidationSchema,
});
const updateProductSchema = zod_1.z.object({
    body: productValidationSchema.partial(),
    // params: z.object({
    //   id: z
    //     .string({
    //       invalid_type_error: "Id must be a string",
    //       required_error: "Id is required",
    //     })
    //     .min(1),
    // }),
});
exports.ProductsValidationSchema = {
    createNewProductSchema,
    updateProductSchema,
};
