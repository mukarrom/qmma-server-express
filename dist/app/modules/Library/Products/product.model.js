"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const library_constant_1 = require("../library.constant");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    image: { type: String, default: null },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "category", required: true },
    tags: { type: [String], default: [] },
    totalBought: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },
    inStock: { type: Number, default: 0 },
    status: {
        type: String,
        enum: Object.values(library_constant_1.PRODUCT_STATUS),
        default: library_constant_1.PRODUCT_STATUS.OUT_OF_STOCK,
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("product", productSchema);
