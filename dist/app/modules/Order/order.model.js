"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = require("../Product/product.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
orderSchema.pre("save", async function (next) {
    if (this?.productId) {
        const product = await product_model_1.ProductModel.findById(this.productId);
        // if product not found
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
        }
        // if product quantity is less than order quantity
        if (product.inventory.quantity < this.quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient quantity available in inventory");
        }
    }
    next();
});
exports.OrderModel = (0, mongoose_1.model)("Order", orderSchema);
