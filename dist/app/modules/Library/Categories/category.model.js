"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    totalProducts: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.CategoryModel = (0, mongoose_1.model)("category", categorySchema);
