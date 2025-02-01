"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
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
        required_error: "Price is required",
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
        required_error: "Category is required",
        invalid_type_error: "Category must be Object Id",
    }),
    tags: zod_1.z
        .array(zod_1.z.string({
        invalid_type_error: "Tags must be an array of strings",
    }))
        .optional(),
});
const createProductValidationSchema = zod_1.z.object({
    body: ProductValidationSchema,
});
const updateProductValidationSchema = zod_1.z.object({
    body: ProductValidationSchema.partial(),
});
const productTotalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bought: zod_1.z
            .number({
            invalid_type_error: "bought must be Number",
        })
            .default(0)
            .optional(),
        sold: zod_1.z
            .number({
            invalid_type_error: "sold must be Number",
        })
            .default(0)
            .optional(),
    }),
});
exports.ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
    productTotalValidationSchema,
};
