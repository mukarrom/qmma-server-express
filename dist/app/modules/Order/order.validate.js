"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = require("zod");
// order validation schema
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
    }),
    productId: zod_1.z.string({
        invalid_type_error: "Product ID must be a string",
        required_error: "Product ID is required",
    }),
    price: zod_1.z
        .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
    })
        .min(1),
    quantity: zod_1.z
        .number({
        invalid_type_error: "Quantity must be a number",
        required_error: "Quantity is required",
    })
        .min(1),
});
// create order validation schema
const createOrderValidationSchema = zod_1.z.object({
    body: orderValidationSchema,
});
// update order validation schema
const updateOrderValidationSchema = zod_1.z.object({
    body: orderValidationSchema,
    // params: z.object({
    //   orderId: z
    //     .string({
    //       invalid_type_error: "Order ID must be a string",
    //       required_error: "Order ID is required",
    //     })
    //     .min(1),
    // }),
});
exports.OrderValidations = {
    createOrderValidationSchema,
    updateOrderValidationSchema,
};
